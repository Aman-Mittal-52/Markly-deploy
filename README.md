# Markly

Markly is a modern, user-friendly bookmark manager application that helps you organize, search, and access your favorite links with ease.

## Features

- **Add, Edit, and Delete Bookmarks:** Quickly save new bookmarks, update existing ones, or remove those you no longer need.
- **Tagging & Categorization:** Organize bookmarks with tags and categories for easy retrieval.
- **Search & Filter:** Instantly find bookmarks using powerful search and filter options.
- **Import/Export:** Easily import bookmarks from your browser or export your collection for backup.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **Dark Mode:** Enjoy a comfortable viewing experience with light and dark themes.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone ...
   cd markly
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Usage

- Click the **Add Bookmark** button to save a new link.
- Use the search bar to quickly find bookmarks.
- Organize bookmarks with tags and categories.
- Edit or delete bookmarks as needed.

## 🚀 Deploying to Vercel

You can deploy the frontend to [Vercel](https://vercel.com/) in just a few steps:

1. **Push your code to GitHub** if you haven't already.

2. **Go to [vercel.com](https://vercel.com/)** and sign in with your GitHub account.

3. **Click "New Project"** and import your `markly` repository.

4. When prompted:
   - **Framework preset:** Select **Vite** (if you used Vite) or **React**
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Install command:** `npm install`
   - **Environment Variables:**
     - Add `VITE_MARKLY_BACKEND_ENDPOINT` pointing to your backend (e.g. `https://api.markly.app`)

5. **Click "Deploy"** and wait for the build to complete.

6. Your site will be live at `https://your-project-name.vercel.app`.

> ✅ Bonus: Set up a custom domain via Vercel settings after deployment.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

---

**Markly** — Your bookmarks, organized.
