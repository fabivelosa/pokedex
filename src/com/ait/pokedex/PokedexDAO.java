package com.ait.pokedex;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List; 

public class PokedexDAO {

	public List<Pokedex> findAll() {
		List<Pokedex> list = new ArrayList<Pokedex>();
		Connection c = null;
		String sql = "SELECT * FROM pokemon ORDER BY name";
		try {
			c = ConnectionHelper.getConnection();
			Statement s = c.createStatement();
			ResultSet rs = s.executeQuery(sql);
			while (rs.next()) {
				list.add(processRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return list;
	}

	public Pokedex findById(int id) {
		String sql = "SELECT * FROM pokemon where id = ?";
		Pokedex poke = null;
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				poke = processRow(rs);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return poke;
	}
	
	public List<Pokedex> findByName(String name) {
		List<Pokedex> list = new ArrayList<Pokedex>();
		Connection c = null;
		String sql = "SELECT * FROM pokemon where Upper(name) like ? " + "order by name";
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, "%" + name.toUpperCase() + "%");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				list.add(processRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return list;
	}

	public List<Pokedex> findByRegionAndCategory(String region, String category) {
		List<Pokedex> list = new ArrayList<Pokedex>();
		Connection c = null;
		String sql = "SELECT * FROM Pokedex.Pokemon where Upper(region) like ? " + " and Upper(category) like  ? "
				+ " order by name";
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement(sql);
			ps.setString(1, "%" + region.toUpperCase() + "%");
			ps.setString(2, "%" + category.toUpperCase() + "%");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				list.add(processRow(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return list;
	}

	protected Pokedex processRow(ResultSet rs) throws SQLException {
		Pokedex poke = new Pokedex();
		poke.setId(rs.getInt("id"));
		poke.setName(rs.getString("name"));
		poke.setAttack(rs.getString("attack"));
		poke.setCategory(rs.getString("category"));
		poke.setGender(rs.getString("gender"));
		poke.setRegion(rs.getString("region"));
		poke.setEvolution(rs.getString("evolution"));
		poke.setPhoto(rs.getString("photo"));
		poke.setDescription(rs.getString("description"));
		return poke;
	}

	public Pokedex create(Pokedex poke) {
		Connection c = null;
		String sql = null;
		try {
			c = ConnectionHelper.getConnection();
			sql = "INSERT INTO Pokedex.Pokemon (name, attack, category, gender, region, evolution, photo, description) "
					+ "VALUES (?,?,?,?,?,?,?,?);";
			PreparedStatement ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, poke.getName());
			ps.setString(2, poke.getAttack());
			ps.setString(3, poke.getCategory());
			ps.setString(4, poke.getGender());
			ps.setString(5, poke.getRegion());
			ps.setString(6, poke.getEvolution());
			ps.setString(7, poke.getPhoto());
			ps.setString(8, poke.getDescription());
			ps.executeUpdate();
			ResultSet rs = ps.getGeneratedKeys();
			rs.next();
			int id = rs.getInt(1);
			poke.setId(id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		System.out.println(sql + "id= " + poke.getId());
		return poke;
	}

	public Pokedex update(Pokedex poke) {
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c
					.prepareStatement("UPDATE Pokedex.Pokemon set name =?, attack =?, category =?, evolution =?, region=?, photo=?, "
							+ "gender=?, description=? WHERE id=?;");
			ps.setString(1, poke.getName());
			ps.setString(2, poke.getAttack());
			ps.setString(3, poke.getCategory());
			ps.setString(4, poke.getEvolution());
			ps.setString(5, poke.getRegion());
			ps.setString(6, poke.getPhoto());
			ps.setString(7, poke.getGender());
			ps.setString(8, poke.getDescription());
			ps.setInt(9, poke.getId());
			ps.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
		return poke;
	}

	public boolean remove(int id) {
		Connection c = null;
		try {
			c = ConnectionHelper.getConnection();
			PreparedStatement ps = c.prepareStatement("DELETE FROM Pokedex.Pokemon WHERE id=?;");
			ps.setInt(1, id);
			int count = ps.executeUpdate();
			return count == 1;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} finally {
			ConnectionHelper.close(c);
		}
	}
}
