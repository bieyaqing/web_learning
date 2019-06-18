# Web Learning
Viatick website and web application Structure, Frameworks and Technologies.

## Development Environment
- **Editor and IDE**
	- Sublime Text
		- Description: Editor for almost all programming language and tons of plugins support
		- Download Link: [Sublime](https://www.sublimetext.com/)
	- Eclipse
		- Description: IDE for Java Web Application
		- Download Link: [Eclipse](https://eclipse.org/downloads/)
	- MySQL Workbrench
		- Description: MySQL Database Admin tool include SQL and ERD
		- Download Link: [MySQL Workbrench](https://dev.mysql.com/downloads/workbench/)

- **Server OS**
	- Ubuntu 14.4+ 64 bit
		- Info: [Ubuntu](http://www.ubuntu.com/)

- **Server Software**
	- Java Default JDK
		- Description: Java programming language
		- Install:
		```
		$ apt-get install default-jdk
		```
	- Apache 2
		- Description: Http server run Html and PHP
		- Install:
		```
		$ apt-get install apache2
		```
	- Tomcat 7, 8
		- Description: Application server run Java App Project
		- Install:
		```
		$ apt-get install tomcat7
		$ apt-get install tomcat8
		```
	- Apache 2 + Tomcat + mod_jk
		```
		$ apt-get install libapache2-mod-jk

		$ nano /etc/apache2/workers.properties
		# Define 1 real worker using ajp13
		worker.list=worker1
		# Set properties for worker (ajp13)
		worker.worker1.type=ajp13
		worker.worker1.host=localhost
		worker.worker1.port=8009

		$ nano /etc/apache2/mods-enabled/jk.conf
		JkWorkersFile /etc/apache2/workers.properties

		$ nano /etc/tomcat7/server.xml
		<Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />

		$ nano /etc/apache2/sites-enabled/000-default.conf
		JkMount /xxx* worker1

		$ apt-get install libapache2-mod-rpaf
		$ a2enmod rpaf
		$ nano /etc/apache2/mods-available/rpaf.conf

		$ service tomcat7 restart
		$ service apache2 restart
		```
	- MySQL Server 5
		- Description: Relational Database
		- Install:
		```
		$ apt-get install mysql-server
		```
	- MySQL Server + Client
		- Description: Mirror Database
		- Master
		```
		$ sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
		```
		```
		bind-address = 127.0.0.1
		# change to
		bind-address = <server_ip>
		server-id = 1
		log_bin = /var/log/mysql/mysql-bin.log
		binlog_do_db = <mirror_database>
		```
		```
		$ service mysql restart
		$ mysql -u root -p
		```
		```
		mysql> GRANT REPLICATION SLAVE ON *.* TO 'slave_user'@'%' IDENTIFIED BY '<password>';
		mysql> FLUSH PRIVILEGES;
		mysql> USE <mirror_database>;
		mysql> FLUSH TABLES WITH READ LOCK;
		mysql> SHOW MASTER STATUS;
		+------------------+----------+--------------+------------------+
		| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB |
		+------------------+----------+--------------+------------------+
		| mysql-bin.000001 |     1247 | <mirror_database>  |                  |
		+------------------+----------+--------------+------------------+
		1 row in set (0.00 sec)
		```
		```
		$ mysqldump -u root -p --opt <mirror_database> > <mirror_database>.sql
		```
		```
		mysql> UNLOCK TABLES;
		mysql> QUIT;
		```
		- Slave
		```
		$ mysql -u root -p
		```
		```
		mysql> CREATE DATABASE <mirror_database>;
		mysql> EXIT;
		```
		```
		$ mysql -u root -p <mirror_database> < /path/to/<mirror_database>.sql
		$ nano /etc/mysql/mysql.conf.d/mysqld.cnf
		```
		```
		server-id = 2
		relay-log = /var/log/mysql/mysql-relay-bin.log
		log_bin = /var/log/mysql/mysql-bin.log
		binlog_do_db = <mirror_database>
		```
		```
		$ service mysql restart
		```
		```
		mysql> USE <mirror_database>
		mysql> CHANGE MASTER TO MASTER_HOST='<server_ip>', MASTER_USER='slave_user', MASTER_PASSWORD='<password>', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS = 1247;
		mysql> START SLAVE;
		mysql> SHOW SLAVE STATUS\G;
		# or
		mysql> SET GLOBAL SQL_SLAVE_SKIP_COUNTER = 1; SLAVE START;
		mysql> QUIT;
		```
	- Phpmyadmin
		- Description: MySQL Admin UI
		- Install:
		```
		$ apt-get install phpmyadmin
		```
		- Config: Add `Include /etc/phpmyadmin/apache.conf` at the end of `/etc/apache2/apache2.conf`

## Development Framworks and Libraries
- **jQuery (deprecated)**
	- Description: JavaScript Library makes HTML document traversal and manipulation, event handling, animation, and Ajax simpler.
	- Download Link: [jQuery](http://jquery.com/download/)
- **AngularJs**
	- Description: JavaScript Framework synchronoise your web UI
	- Download Link: [AngularJs](https://angularjs.org/)
	- Download Link2: [AngularJs](https://angular.cn/)
- **Angular**
	- Description: One framework. Mobile & desktop.
	- Documentation Link: [Angular](https://angular.io/)
- **Bootstrap (deprecated)**
	- Description: HTML5 Responsive website framework.
	- Download Link: [Bootstrap](http://getbootstrap.com/)
	- Download Link2: [Bootstrap](http://bootstrap.cn/)
- **Semantic UI**
	- Description: Human language for web
	- Download Link: [Semantic](http://semantic-ui.com/)
- **Hibernate**
	- Description: Database management library for Java
	- Info: [Hibernate](http://hibernate.org/)
- **Maven**
	- Description: Java Library repository management tool
	- Info: [Maven](https://maven.apache.org/)

## Data Structure
- **JSON**
	- Link: [JSON](http://www.json.org/)
	- Validate Tools: [JSONLint](http://jsonlint.com/)
	- YQ Rules
			
		| Status    | Value       | Return             |
		| ----------|-------------|--------------------|
		| fail      | 0  `number` | message `string`   |
		| success   | 1  `number` | data `object`      |
		| exception | 2  `number` | exception `string` |
		| auth fail | 3  `number` | message `string`   |

		- Basic `success case`

		```json
		{
			"status": 1,
			"data": {}
		}
		```

		- Object Data

		```json
		"data": {
			"key_1": "value-1",
			"key_2": "value-2"
		}
		```

		- Array Data (deprecated)

		```json
		"data": {
			"size": 1,
			"array": [{
				"key_1": "value-1",
				"key_2": "value-2"
			}]
		}
		```

## Web Application Structure
> This section makes a clear cut to segregate different job scopes.

- **Frontend (deprecated)**
> follow angular 4 standard!
```
	.
	+-- index.html
	+-- _template
	|   +-- **.html
	+-- _js
	|   +-- **.js
	+-- _css
	|   +-- **.css
	+-- _lib
	|   +-- _**
	|   |   +-- _js
	|   |   |   +-- **.js
	|   |   +-- _css
	|   |   |   +-- **.css
	+-- _media
	|   +-- _img
	|   |   +-- **.png
	|   +-- _audio
	|   |   +-- **.mp3
	|   +-- _video
	|   |   +-- **.mp4
```

- **Backend**
	- architecture

		> Interfaces and structure mapping
	- model

		> Basic objects
	- persistence

		> Data I/O from database
	- ctrl

		> Basic C R U D, Logic and Algorithm
	- system

		> Keys, Values and Configuration
	- service

		> Data exchange for system internal usage
	- sdk.v

		> Data exchange for mobile 
	- api.v

		> Data exchange for standard API
- **Database**
	- Hibernate Config
	- Hibernate Mapping
	- MySQL
