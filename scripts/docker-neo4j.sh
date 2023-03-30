# execute this script to start a neo4j docker container
# create a new terminal and execute the following command
# To do this use Xterm or konsole or gnome-terminal
# Currently not installable in devContainer

echo "Setting up the environment variables"
# Setup the environment variables
. ./scripts/setenv.sh

# Start the neo4j docker container

NEO4J= docker run \
    --rm \
    --interactive \
    --publish=7474:7474 --publish=7687:7687 \
    --env=NEO4J_AUTH=${NEO4J_USER}/${NEO4J_PASSWORD} \
    --volume=$HOME/neo4j/data:/data \
    --volume=$HOME/neo4j/logs:/logs \
    --volume=$HOME/neo4j/conf:/conf \
    neo4j

# If Neo4j fails to start, try the following:
# sudo chown neo4j:neo4j $HOME/neo4j/conf
# sudo chown neo4j:neo4j $HOME/neo4j/logs
# sudo chown neo4j:neo4j $HOME/neo4j/data

# Start the neo4j docker container

echo "Starting Neo4j docker container"
$NEO4J
