package com.ait.pokedex;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionHelper
{
	private String url;
	private static ConnectionHelper instance;

	private ConnectionHelper()
	{
    	String driver = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		 //docker	
		 url = "jdbc:mysql://127.0.0.1:3307/Pokedex?useSSL=false&allowPublicKeyRetrieval=true&user=root&password=admin123";
		//	url = "jdbc:mysql://127.0.0.1:3306/Pokedex?user=root&password=admin123";
            driver="com.mysql.cj.jdbc.Driver";
            Class.forName(driver);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static Connection getConnection() throws SQLException {
		if (instance == null) {
			instance = new ConnectionHelper();
		}
		try {
			return DriverManager.getConnection(instance.url);
		} catch (SQLException e) {
			throw e;
		}
	}
	
	public static void close(Connection connection)
	{
		try {
			if (connection != null) {
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
