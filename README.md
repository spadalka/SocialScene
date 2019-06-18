# SocialScene
  **SocialScene** is a social-networking service that will provide a platform for friend groups to rate and comment on tv shows, individual episodes, and movies, allowing for the coordination of content viewing amongst friends. Our platform will leverage Netflix and Amazon Prime Video (the “Providers”) APIs in order to aggregate viewing options for our members. Our target audience consists of people who watch media through Netflix and/or Amazon Prime Video, and have friends who do the same.
  
  Currently, Providers suggest content based on a specific user’s viewing history, and only suggest content within the individual Provider’s catalog, using proprietary algorithms and aggregate ratings/viewership across its entire user base. An individual consumer of these Providers has no dedicated method of coordinating viewership amongst their friend group, and must rely on the Provider’s own suggestion algorithms, or what’s popular across the entire user base, who’s overall interests may differ from the user’s own preferences. 
  
  Our platform will leverage multiple Provider catalogs, and, through social-networking, will display what a user’s friends are currently watching, their friends’ ratings for that content, and comment sections for each piece of individual content. The platform will have the option of hiding/greying-out any content from Providers that the user does not currently subscribe to.

The main features of our platform are as follows:

1. A social network allowing individual users to become friends and share information (potentially using Facebook’s Graph API, if feasible)
2. A content catalog from the Provider platforms, using publicly available APIs, with links directing the user directly to the content page on the Provider’s platform for viewing
3. A real-time comment and rating system, as well as private messaging (if there’s time)
4. Content suggestions specific to each user, sorted/organized using proprietary algorithms
