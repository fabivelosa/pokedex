# pokedex
Set up
Before running the project or even validate everything by running mvn clean install, you need a DB running. A dockerfile has been provided ready to use, you need just to build it.

docker build -t pokedexdb .
docker run --name pokedexdb -p 3306:3307 pokedexdb -d
mvn jetty:run
