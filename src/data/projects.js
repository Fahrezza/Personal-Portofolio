// Add a new project by appending an object here. A `caseStudy` is optional.
export const projects = [
  {
    slug: 'gunalagi', title: 'GunaLagi', category: 'Full-Stack Web Development', image: '/images/gunalagi.png',
    summary: 'GunaLagi is a web-based platform that promotes item reuse through barter and donations, supporting SDG 12: Responsible Consumption and Production by reducing waste and encouraging sustainable consumption.',
    role: 'Full-Stack Developer',
    highlights: ['React frontend', 'Node.js & Express.js backend', 'REST API development', 'MySQL database integration', 'Authentication: registration, login, password hashing', 'Frontend and backend integration', 'Git & GitHub collaboration'],
    tech: ['React', 'JavaScript', 'Node.js', 'Express.js', 'MySQL', 'Git', 'GitHub'],
    repo: 'https://github.com/your-username/gunalagi', demo: null,
    contributions: {
      Frontend: ['Developed user interfaces using React.', 'Implemented reusable components.', 'Built responsive page layouts.', 'Integrated frontend with backend APIs.'],
      Backend: ['Developed server-side functionality using Node.js and Express.js.', 'Implemented RESTful API endpoints.', 'Worked on user registration and login.', 'Implemented password hashing.', 'Integrated application services.'],
      Database: ['Used MySQL for relational data management.', 'Connected backend services to the database.'],
      Collaboration: ['Used Git and GitHub.', 'Participated in collaborative development.', 'Worked with other team members.'],
    },
    caseStudy: {
      draft: true,
      overview: 'GunaLagi is a website-based platform that provides barter and donation services for reusable items. The platform aims to extend the lifecycle of goods, reduce waste, and encourage people to adopt a more sustainable lifestyle by giving pre-owned items a second life.',
      problem: 'Pre-owned items often go unused while others are looking for sustainable alternatives. Without a dedicated, easy to use platform, people may struggle to find and access reusable items.',
      objectives: ['Provide a simple place to list and discover pre-owned products.', 'Offer secure user registration and login.', 'Deliver a responsive interface for desktop and mobile.', 'Practice collaborative full-stack development with Git and GitHub.'],
      architecture: 'The React frontend talks to the Express.js backend through a RESTful API over HTTP. The backend handles authentication and business logic, and reads and writes data in a MySQL database.',
      frontend: 'The interface is built with React using reusable components and responsive layouts, and consumes the backend through API calls.',
      backend: 'The server uses Node.js and Express.js to expose REST endpoints, handle registration and login, and hash passwords before storing them.',
      database: 'MySQL stores relational data, and the backend connects to it to persist and query application data.',
      challenges: ['Keeping frontend and backend in sync while several people worked in parallel.', 'Handling authentication safely, including password storage.', 'Designing relational data that supports the marketplace features.'],
      solutions: ['Agreed on API endpoints early and tested them with Postman.', 'Hashed passwords before saving them to the database.', 'Used Git branches and GitHub to share and review work.'],
      lessons: ['Clear API contracts make team collaboration much smoother.', 'Security basics such as password hashing belong in the first version.', 'Reusable components keep a growing interface maintainable.'],
    },
  },
]
