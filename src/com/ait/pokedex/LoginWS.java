package com.ait.pokedex;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("pokedex/login")
public class LoginWS {

	LoginDAO dao = new LoginDAO();

	@GET
	@Path("search/{query}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Login findByUsername(@PathParam("query") String username) {
		System.out.println("findById " + username);
		return dao.findByUsername(username);
	}
}