# Inspiration

At UC Irvine, we’ve noticed that while the campus is beautiful and full of life, it can sometimes feel quiet and socially distant. Many students have experienced how difficult it can be to approach others and make new friends, especially when it’s unclear who else is also looking to connect. This sense of social hesitation inspired us to think about how we could make it easier for UCI students to meet each other in a **low-stress, welcoming environment**.

While there are plenty of existing social apps, they do not encourage users to go and spend time with someone new and build a relationship with them. Our app aims to improve that. By integrating Google LangChain with campus group event data, our app generates **personalized activity suggestions** that naturally bring students together. This makes it easier to form **meaningful connections** through a shared activity.

That’s how we came up with **Matcha**: an AI-powered friendship app designed specifically for UCI students. Matcha helps students safely and effortlessly meet new people. This turns social curiosity into real friendships rooted in **authentic interactions** and common interests.

---

# What It Does

**Matcha** is a web app that helps UCI students connect and make friends without the awkwardness.

- **UCI-only community**: Users sign up with their UCI email to ensure everyone is part of the same safe, trusted network.
- **Personalized profiles**: Students fill out their interests, availability, and preferences.
- **AI-generated matches**: Google Gemini analyzes all profile data to find the best friend match for you.
- **Hangout planner**: The app generates a meetup suggestion with a day, time, activity, and campus location so you don’t have to overthink it.
- **Friendship graph**: As you meet people, your friendship network visually grows, allowing you to see how your social circle is expanding.

---

# How We Built It

We built **Matcha** as a web application using:

- Google Cloud Gemini API to generate personalized hangout suggestions.
- Google LangChain to query the UCI campus group API.
- 3D React force social graph animation.
- Next.js and React for the frontend.
- Tailwind CSS for fast, responsive, and clean UI styling.
- Python for AI logic and backend processing.
- Render to host the backend services.
- Vercel to deploy the frontend.
- GitHub to manage version control and collaborate smoothly.

---

# Challenges We Ran Into

- **AI matching complexity**: Balancing availability, preferences, and compatibility into one model took several prompt iterations and testing.
- **Frontend/backend integration**: Combining the Python AI backend with our React frontend and syncing responses across services required careful coordination.
- **Friendship graph rendering**: Creating a dynamic, real-time graph to visualize new connections added another layer of complexity we had to learn on the go.

---

# Accomplishments That We're Proud Of

- We created a unique way to solve a real **social challenge** on our campus.
- We successfully integrated **AI** into a social app to generate personalized hangouts and matches for the users.
- Our **3D friendship graph** helps users visualize their growing friendships.

---

# What We Learned

- Effectively using the Gemini API for AI-generated suggestions in a real-world application.
- Translating a social problem into a technical solution with impact.
- Using various graphical libraries for 3D graph rendering.

---

# What’s Next for Matcha

- **Expand** to other universities with similar social challenges.
- Introduce a feedback system so the AI can improve its matching over time based on **real-world results**.
- Eventually launch a **mobile version** of the app for even easier access on the go.
- Add more **graph insights** so users can see patterns in their social growth (like shared interests, activity trends, etc.).
