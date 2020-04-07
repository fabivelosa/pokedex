package com.ait.pokedex;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Pokedex {

	private int id;
	private String name;
	private String category;
	private String gender;
	private String attack;
	private String region;
	private String evolution;
	private String description;
	private String img;

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		if (name == null)
			throw new IllegalArgumentException("Name cannot be null");

		if (name.trim().length() == 0)
			throw new IllegalArgumentException("Name cannot be empty");

		this.name = name;
	}

	/**
	 * @return the category
	 */
	public String getCategory() {
		return category;
	}

	/**
	 * @param category the category to set
	 */
	public void setCategory(String category) {
		if (category == null)
			throw new IllegalArgumentException("Category cannot be null");

		if (category.trim().length() == 0)
			throw new IllegalArgumentException("Category cannot be empty");

		this.category = category;
	}

	/**
	 * @return the gender
	 */
	public String getGender() {
		return gender;
	}

	/**
	 * @param gender the gender to set
	 */
	public void setGender(String gender) {
		this.gender = gender;
	}

	/**
	 * @return the attack
	 */
	public String getAttack() {
		return attack;
	}

	/**
	 * @param attack the attack to set
	 */
	public void setAttack(String attack) {
		this.attack = attack;
	}

	/**
	 * @return the region
	 */
	public String getRegion() {

		return region;
	}

	/**
	 * @param region the region to set
	 */
	public void setRegion(String region) {
		if (region == null)
			throw new IllegalArgumentException("Region cannot be null");

		if (region.trim().length() == 0)
			throw new IllegalArgumentException("Region cannot be empty");

		this.region = region;
	}

	/**
	 * @return the evolution
	 */
	public String getEvolution() {
		return evolution;
	}

	/**
	 * @param evolution the evolution to set
	 */
	public void setEvolution(String evolution) {
		this.evolution = evolution;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the photo
	 */
	public String getImg() {
		return img;
	}

	/**
	 * @param photo the photo to set
	 */
	public void setImg(String photo) {
		this.img = photo;
	}

	public Pokedex() {
		super();
		if (id < 0)
			throw new IllegalArgumentException("Id cannot be negative");

	}

}
