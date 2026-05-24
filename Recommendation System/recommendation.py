import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
movies = pd.read_csv("movies.csv")

# Convert text data into vectors
cv = CountVectorizer()

vectors = cv.fit_transform(movies['genre']).toarray()

# Calculate similarity
similarity = cosine_similarity(vectors)

def recommend(movie_name):
    
    # Find movie index
    movie_index = movies[movies['title'] == movie_name].index[0]

    # Get similarity scores
    distances = similarity[movie_index]

    # Sort movies based on similarity
    movie_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )

    print(f"\nRecommended movies for {movie_name}:\n")

    # Show top 5 recommendations
    for i in movie_list[1:6]:
        print(movies.iloc[i[0]].title)

# User input
movie = input("Enter movie name: ").title()

recommend(movie)