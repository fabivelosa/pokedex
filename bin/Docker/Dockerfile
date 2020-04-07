FROM mysql

ENV MYSQL_ROOT_PASSWORD="admin123"
ENV MYSQL_DATABASE="Pokedex"

ADD pokedexDDL.sql /docker-entrypoint-initdb.d/pokedexDDL.sql
ADD pokedexDML.sql /docker-entrypoint-initdb.d/pokedexDML.sql
RUN chmod -R 775 /docker-entrypoint-initdb.d
