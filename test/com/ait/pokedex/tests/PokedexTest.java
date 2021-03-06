package com.ait.pokedex.tests;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.ait.pokedex.DBConnection;
import com.ait.pokedex.Pokedex;
import com.ait.pokedex.PokedexDAO;

public class PokedexTest {

	public Pokedex pokedex;
	public PokedexDAO dao;
	List<Pokedex> list = new ArrayList<Pokedex>();
	public DBConnection con;
	Connection c = null;

	@BeforeEach
	public void init() throws ClassNotFoundException, SQLException {
		c = DBConnection.getConnection();
		dao = new PokedexDAO();

	}

	/**
	 * @throws java.lang.Exception
	 */
	@AfterEach
	public void tearDown() throws Exception {
		c.close();
	}

	@Test
	void testCreate() {
		pokedex = new Pokedex();
		pokedex.setId(14);
		pokedex.setName("Rattata");
		pokedex.setCategory("Grass");
		pokedex.setAttack("Run Away");
		pokedex.setRegion("Kanto");
		pokedex.setDescription("Rattata is cautious in the extreme. Even while it is asleep, "
				+ "it constantly listens by moving its ears around.");
		pokedex = dao.create(pokedex);
	}

	@Test
	public void testCreateDuplicated() {
		pokedex = new Pokedex();
		pokedex.setId(14);
		pokedex.setName("Rattata");
		pokedex.setCategory("Grass");
		pokedex.setAttack("Run Away");
		pokedex.setRegion("Kanto");
		// pokedex = dao.create(pokedex);
	}

	@Test
	void testRemove() {
		boolean count = dao.remove(14);
		assertTrue(count);
	}

	@Test
	void testUpdate() {
		pokedex = new Pokedex();
		pokedex.setId(14);
		pokedex.setName("Rattata");
		pokedex.setCategory("Grass");
		pokedex.setAttack("Run Away");
		pokedex.setDescription("Rattata is cautious in the extreme. Even while it is asleep, "
				+ "it constantly listens by moving its ears around.");
		pokedex = dao.update(pokedex);
	}

	@Test
	void testFindbyId() {
		pokedex = dao.findById(1);
		assertEquals("Bulbasaur", pokedex.getName());
		assertEquals("Grass", pokedex.getCategory());
		assertEquals("Male", pokedex.getGender());
	}

	@Test
	public void testFindByIdNotFound() {
		assertEquals(null, dao.findById(1111));
	}

	@Test
	void testFindbyName() {
		list = dao.findByName("Venusaur");
		assertEquals(3, list.get(0).getId());
		assertEquals("Venusaur", list.get(0).getName());
		assertEquals("Grass", list.get(0).getCategory());
		assertEquals("Male", list.get(0).getGender());
		assertEquals("Ivysaur", list.get(0).getEvolution());
	}

	@Test
	public void testFindByNameNotFound() {
		assertEquals(list, dao.findByName("Fabiane"));
		assertEquals(0, list.size());
	}

	@Test
	void testFindAll() {
		list = dao.findAll();
		assertFalse(list.isEmpty());
	}

	@Test
	void testFindByRegionAndCategory() {
		list = dao.findByRegionAndCategory("Kanto", "Fire");
		assertFalse(list.isEmpty());
		assertEquals("Kanto", list.get(0).getRegion());
		assertEquals("Fire", list.get(1).getCategory());
		assertEquals("Male", list.get(2).getGender());
	}

	@Test
	public void testFindByRegionAndCategoryNotFound() {
		assertEquals(list, dao.findByRegionAndCategory("Athlone", "City"));
		assertEquals(0, list.size());
	}

}
