## gBanker background-services
### Two type background Service
1. Tab Collection
2. Daily Process
### To run a background service do followings
1. copy service-apps directory in you target OS environment (eg. Ubuntu Server)
2. copy all files within services directory to /etc/systemd/system
3. execute following commands sudo systemctl enable name_of_service.service 
4. sudo systemctl start name_of_service.service
5. check status using sudo systemctl status name_of_service.service
6. check log usng sudo journalctl -u name_of_service.service -f
### To write new service for new vendor
1. make copy of any file from sevices directory
2. change necessary file path for necessary .jar file to execute service for the particular service-app
3. execute following commands sudo systemctl enable name_of_service.service sudo systemctl start name_of_service.service
### To compile source
1. Required minimum JDK 1.8
2. Intelij Community Edition (It will setup Maven automatically with IDE)
3. Open tab-collection or daily-process project
4. After Opening Project need to Build using maven command
5. From Inetlij IDE right pannel called maven use clean command from lifecycle group
6. Then Run install from lifecycle group under maven pannel
7. with target directory under project root direct new jar will be available.
