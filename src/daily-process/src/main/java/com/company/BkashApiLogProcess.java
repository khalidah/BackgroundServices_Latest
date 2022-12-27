package com.company;

import com.company.email.EmailService;
import com.company.exception.ExceptionWriter;
import com.company.logger.WriteLog;

import java.sql.*;

public class BkashApiLogProcess {

    Connection conn;
    String db;
    String ip;
    WriteLog writeLog;
    EmailService emailService;
    public BkashApiLogProcess(Connection conn){
        this.conn = conn;
    }

    public BkashApiLogProcess(Connection conn, String db, String s, EmailService emailService, WriteLog writeLog) {
        this.conn = conn;
        this.db = db;
        this.ip = s;
        this.writeLog = writeLog;
        this.emailService = emailService;
    }

    public void execute() throws SQLException {
        long start = System.currentTimeMillis();
        Statement stmt = conn.createStatement();
        ResultSet resultSet = stmt.executeQuery("SELECT TOP 50 ID,BusinessDate,OfficeID FROM vw_bKashAPILOG WHERE IsUploaded=0 ORDER BY ID ASC");


        while (resultSet.next()) {

            System.out.println("ID: "+resultSet.getLong("ID")+" OFFICE_ID: "+resultSet.getLong("OfficeID"));

            BkashApiLog bkashApiLog = new BkashApiLog(resultSet.getInt("ID"));
            bkashApiLog.setBusinessDate(resultSet.getString("BusinessDate"));
            bkashApiLog.setOfficeID(resultSet.getLong("OfficeID"));
            try {
                String data =  bkashApiLog.getOfficeID()+","+bkashApiLog.getID()+",'"+bkashApiLog.getBusinessDate().substring(0,10)+"'";

                //String command = "{call SPTESTRais("+data+")}";
                String command = "{call setbKashUploadForService(" + data + ")}";

                CallableStatement cstmt = conn.prepareCall(command);
                boolean executed = cstmt.execute();
                conn.commit();
                if (executed) {
                    System.out.println("Executed: " + bkashApiLog.getID() + ", status: " + executed);
                } else {
                    System.out.println("Executed: " + bkashApiLog.getID() + ", status: " + executed);
                }

            } catch (Exception e) {
                String issueId = ip+"\r\nID:"+bkashApiLog.getID()+",OFFICE:"+bkashApiLog.getOfficeID()+"\r\n";
                emailService.sendMail(ExceptionWriter.getExceptionMessage(db,issueId,e,writeLog));
                System.out.println("Exception Cause:[ID-"+bkashApiLog.getID()+"]: "+e.getMessage());
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
        }

        conn.setAutoCommit(true);
    }
}
