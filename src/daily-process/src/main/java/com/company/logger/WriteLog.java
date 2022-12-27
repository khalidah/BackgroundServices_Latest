package com.company.logger;


import java.io.IOException;
import java.util.logging.FileHandler;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class WriteLog {

    private Logger logger;
    private FileHandler fh;

    public WriteLog(Logger logger,String sName) throws IOException {
        this.logger = logger;
        String fileName = (sName!=null)? sName+"-error.log" : "error.log";
        fh = new FileHandler("/home/buro/service-apps/daily-process-logs/"+fileName,true);
        logger.addHandler(fh);
        SimpleFormatter formatter = new SimpleFormatter();
        fh.setFormatter(formatter);

    }

    public void writeToFile(String msg) {
        logger.info(msg);
    }

}
