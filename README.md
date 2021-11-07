# Aaron's Adoptions

My second project after beginning to learn web development. Aaron's Adoptions is a mock pet adoption site where users may either apply to adopt, or place pets into adoption.
Users with administrative privilege then have access to accept or deny both outgoing and incoming requests. This project encompassed an entire new suite of resources to handle
the front and backend, which I've listed in full below.

Major learning points in this project:

  - NodeJS
    - Express
      - RESTful API.
      - Defining custom middleware.
      - Authenticated routes.
      - Use of URL params.
      - Asyncronous callbacks and promises.
      - Multipart/form-data post requests, image uploading to backend.
      - Regex validation of inputs on front & backend.
      
    - Express Sessions
      - User authentication.
      - Deletion of cookies and session on logout.
      
    - Mongoose 
      - Schema design
      - Specific database querying
      - Dynamic querying based on filter settings user selects.
    
    - EJS (Embedded Javascript Templates)
      - Set view enginge in express to serve dynamic content through EJS templates.
      - Dynamic serving of pet information.
      - Different layouts based on administrator or regular user privilege. 
    
  - MongoDB databasing
    - Learned different databasing relationships used in this project, such as one-to-many.
      
  - Bootstrap
    - Improvements to HTML structuring methodology.
    - Learnt the specifics of the Bootstrap framework
    - CSS positioning propeties such as grid and flexbox.
    - Breakpoints for mobile responsive design.
