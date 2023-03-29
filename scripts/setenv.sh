    
# Show env vars
# grep -v '^#' .env
grep -v '^#' -r --include='.env*' --exclude='.env.sample' 

# Export env vars
export $(grep -v '^#' .env | xargs)