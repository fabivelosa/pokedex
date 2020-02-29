package com.ait.pokedex;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("pokedex")
public class PokedexResource {

	PokedexDAO dao = new PokedexDAO();

	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Pokedex> findAll() {
		System.out.println("findAll"); 
		return dao.findAll();
	}

	@GET
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })

	public Pokedex findById(@PathParam("id") String id) {
		System.out.println("findById " + id);
		return dao.findById(Integer.parseInt(id));
	}

	@GET
	@Path("search/{query}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })

	public List<Pokedex> findByName(@PathParam("query") String query) {
		System.out.println("findByName " + query);
		return dao.findByName(query);
	}

	@GET
	@Path("/query")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<Pokedex> findByRegionAndCategory(@QueryParam("region") String region,
			@QueryParam("category") String category) {
		System.out.println("findByRegionAndCategory " + region + " & " + category);
		return dao.findByRegionAndCategory(region, category);
	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Pokedex create(Pokedex poke) {
		System.out.println("creating pokemon ");
		return dao.create(poke);
	}

	@PUT
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public Pokedex update(Pokedex poke) {
		System.out.println("updating pokemon ");
		return dao.update(poke);
	}

	@DELETE
	@Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public void remove(@PathParam("id") int id) {
		System.out.println("removing pokemon ");
		dao.remove(id);
	}

}
