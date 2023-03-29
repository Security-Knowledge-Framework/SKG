# execute this script to start a neo4j docker container
# create a new terminal and execute the following command
# To do this use Xterm or konsole or gnome-terminal
# Currently not installable in devContainer
 
docker run \
    --rm \
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    --volume=$HOME/neo4j/logs:/logs \
    --volume=$HOME/neo4j/conf:/conf \
    neo4j