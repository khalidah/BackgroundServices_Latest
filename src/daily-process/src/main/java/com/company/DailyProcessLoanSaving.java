package com.company;

import com.company.email.EmailService;
import com.company.exception.ExceptionWriter;
import com.company.logger.WriteLog;

import java.sql.*;

public class DailyProcessLoanSaving {

    Connection conn;
    String limit;
    String db;
    String ip;
    WriteLog writeLog;
    EmailService emailService;
    public DailyProcessLoanSaving(Connection conn, String limit){
        this.conn = conn;
        this.limit = limit;
    }
    public DailyProcessLoanSaving(Connection conn, String limit,String db, String ip, EmailService emailService,
                                  WriteLog writeLog){
        this.conn = conn;
        this.limit = limit;
        this.db = db;
        this.ip = ip;
        this.emailService = emailService;
        this.writeLog = writeLog;
    }
    public void execute() throws SQLException {
        long start = System.currentTimeMillis();
        Statement stmt = conn.createStatement();
        try {
            ResultSet resultSet = stmt.executeQuery("SELECT TOP " + this.limit + " * FROM vw_Collection_LoanSavingsSaving_bulk WHERE IsUploaded=0 ORDER BY ID ASC");

            conn.setAutoCommit(false);
            while (resultSet.next()) {
                System.out.println("ID: "+resultSet.getLong(1)+" SUMMARY_ID: "+resultSet.getLong(2));
                CollectionLoanSavings collectionLoanSavings = new CollectionLoanSavings();
                collectionLoanSavings.setID(resultSet.getLong(1));
                collectionLoanSavings.setSummaryID(resultSet.getLong(2));
                collectionLoanSavings.setOfficeID(resultSet.getInt(3));
                collectionLoanSavings.setCenterID(resultSet.getInt(4));
                collectionLoanSavings.setMemberID(resultSet.getInt(5));
                collectionLoanSavings.setProductID(resultSet.getInt(6));
                collectionLoanSavings.setProductCode(resultSet.getString(7));
                collectionLoanSavings.setLoanPaid(resultSet.getDouble(8));
                collectionLoanSavings.setDeposit(resultSet.getDouble(9));
                collectionLoanSavings.setWithDrawal(resultSet.getDouble(10));
                collectionLoanSavings.setCollectionDate(resultSet.getString(11));
                collectionLoanSavings.setCreateUser(resultSet.getString(12));
                collectionLoanSavings.setCreateDate(resultSet.getString(13));
                collectionLoanSavings.setIsUploaded(resultSet.getInt(14));
                collectionLoanSavings.setLoanDue(resultSet.getDouble(15));
                collectionLoanSavings.setIntDue(resultSet.getDouble(16));
                collectionLoanSavings.setInstallmentNo(resultSet.getInt(17));
                collectionLoanSavings.setPrincipalLoan(resultSet.getDouble(18));
                collectionLoanSavings.setLoanRepaid(resultSet.getDouble(19));
                collectionLoanSavings.setIntCharge(resultSet.getDouble(20));
                collectionLoanSavings.setIntPaid(resultSet.getDouble(21));
                collectionLoanSavings.setBalance(resultSet.getDouble(22));
                collectionLoanSavings.setCollectionGUID(resultSet.getString(23));
                collectionLoanSavings.setTransType(resultSet.getInt(24));


                try {
                    String data = collectionLoanSavings.getOfficeID() + ",'" + collectionLoanSavings.getCreateUser() + "','" + collectionLoanSavings.getCollectionDate().substring(0, 10) + "'," +
                            collectionLoanSavings.getCenterID() + "," +
                            collectionLoanSavings.getSummaryID() + "," +
                            collectionLoanSavings.getProductID() + "," +
                            collectionLoanSavings.getID()+","+
                            collectionLoanSavings.getTransType();


                    String command = "{call UpLoanTabCollectionForServiceSaving_bulk(" + data + ")}";
                    System.out.println(command);

                    CallableStatement cstmt = conn.prepareCall(command);
                    boolean executed = cstmt.execute();
                    conn.commit();
                    if (executed) {
                        System.out.println("Executed: " + collectionLoanSavings.getID() + ", status: " + executed);
                    } else {
                        System.out.println("Executed: " + collectionLoanSavings.getID() + ", status: " + executed);
                    }

                } catch (Exception e) {

                    System.out.println("Exception Cause: [Summary-"+collectionLoanSavings.getSummaryID()+"]: "+e.getMessage());

                    String issueId = ip+"\r\nSID:"+collectionLoanSavings.getSummaryID()+",OFFICE:"+collectionLoanSavings.getOfficeID()+"\r\n";
                    emailService.sendMail(ExceptionWriter.getExceptionMessage(db,issueId,e,writeLog));

                    if(!conn.isClosed()) {
                        conn.setAutoCommit(false);
                        conn.rollback();
                        conn.setAutoCommit(true);
                    }

                } finally {

                    conn.setAutoCommit(true);

                }

                long finish = System.currentTimeMillis();
                long timeElapsed = finish - start;
                System.out.println("Elapsed Time: "+ timeElapsed +"ms");
                conn.setAutoCommit(true);
            }
            System.out.println("End-of-Execution");
        }catch(Exception ex){
            System.out.println("Exception Cause: "+ex.getMessage());
        }

        conn.setAutoCommit(true);

    }
}
