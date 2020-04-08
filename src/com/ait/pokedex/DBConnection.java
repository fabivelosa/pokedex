package com.ait.pokedex;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

	private String url;
	private static DBConnection instance;

	private DBConnection() {
		String driver = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		//	Docker 
			url = "jdbc:mysql://127.0.0.1:3307/Pokedex?useSSL=false&allowPublicKeyRetrieval=true&user=root&password=admin123";
			driver = "com.mysql.cj.jdbc.Driver";
			Class.forName(driver);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static Connection getConnection() throws SQLException {
		if (instance == null) {
			instance = new DBConnection();
		}
		try {
			return DriverManager.getConnection(instance.url);
		} catch (SQLException e) {
			throw e;
		}
	}

	public static void close(Connection connection) {
		try {
			if (connection != null) {
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
