# TruthServer
Truth Server: A Microservice test facility
Every piece of software has a purpose.
A software piece is executed to verify a resolution pattern e.g “A user logged in successfully” is a resolution pattern that does not care about which user. Similarly “A user login is unsuccessful” is another resolution pattern.  A micro service has one or more resolution patterns. A resolution pattern can have a sequence of assertions that the developer knows upfront. e.g.  a resolution pattern “a user has logged in” can have the following assertion sequence :
1.	User has entered the user id.
2.	User has entered the password. 
3.	The user id exists.
4.	The password matched
5.	The user is logged in.


To test the validity of this method, a micro-service Acceptance test can be designed as follows:

1.	For a microservice, a given resolution pattern can be registered with the truth server with a fixed sequence of assertions.
2.	Once registered, the micro service can be run through the test run.
3.	During test run the microservice issues the http put call to the truth server the assertions in sequence.
4.	The truth server registers each of the assertion put requests during the test run of the micro service.
5.	 At the end of the test run the truth server compares the sequence of assertion puts received from the micro service with the sequence originally registered for the same micro service.
6.	If the sequence matches the test passes else, it fails. 
