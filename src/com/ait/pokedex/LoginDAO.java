package com.ait.pokedex;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LoginDAO {

	public Login findByUsername(String username) {
		String sql = "SELECT username, password, role FROM Pokedex.Login where username = ?";
		Login login = null;
		Connection c = null;
		try {
			c = DBConnection.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, username);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				login = processRow(rs);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			DBConnection.close(c);
		}
		return login;
	}

	protected Login processRow(ResultSet rs) throws SQLException {
		Login login = new Login();
		login.setUsername(rs.getString("username"));
		login.setPassword(rs.getString("password"));
		login.setRole(rs.getString("role"));

		return login;
	}
}
