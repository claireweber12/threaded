# Threaded 
[View Threaded](https://main.d3bty356y6d0wb.amplifyapp.com)


Inspired by my own love for needlepoint, Threaded is a needlepoint project tracker that helps stitchers organize canvases, threads, notes, statuses, and project images.

## Overview
Threaded was designed to make needlepoint tracking feel visual, personal, and inspiring. Instead of using a generic notes app or spreadsheet, users can document each canvas with the details that matter most to stitchers: designer, status, thread palette, tags, photos, and notes. The app also includes an Explore page where public projects can be browsed for inspiration, while private projects remain visible only in the user's personal project area.

## Features
* Create, view, edit, and delete projects.
* Upload project images using Supabase storage.
* Track project status including planned, in progress, completed, paused, and abandoned.
* Save thread information including brand, name, color number, and color swatch.
* Filter personal projects by status.
* Search for projects on the explore page using tags, title, or designer.
* Make projects public or private.
* View project details including image, notes, tags, designer, and thread palette.
*  Responsive layout for desktop and mobile screens.
## Tech Stack
* React
* Vite
* JavaScript
* React Router
* Supabase Database
* Supabase Storage
* CSS

## Deployment

Threaded is deployed using AWS Amplify Hosting. The frontend is built with Vite and hosted as a static React application, with Supabase providing the backend database and image storage.

## Database Structure
Threaded uses a relational data model in Supabase. 


### `projects`

Stores the main project information.

Key fields include:

- `id (pk)`
- `title`
- `designer`
- `status`
- `notes`
- `image_url`
- `is_public`
- `created_at`

### `project_threads`

Stores the thread palette for each project. Each project can have many thread rows.

Key fields include:

- `id (pk)`
- `project_id (fk)`
- `brand`
- `color_number`
- `color_name`
- `color_hex`

### `tags`

Stores unique tag names.

Key fields include:

- `id (pk)`
- `name`

### `project_tags`

Join table that creates a many-to-many relationship between projects and tags.

Key fields include:

- `project_id (pk, fk)`
- `tag_id (pk, fk)`

## Project Relationships

- One project can have many thread colors.
- One project can have many tags.
- One tag can belong to many projects.
- Public projects appear on the Explore page.
- Private projects stay out of Explore.

## Screenshots
## Future Improvements
* Add user authentication with Supabase Auth
* Connect projects to individual user accounts
* Add likes or saves for public projects
* Add comments on public projects
* Add project progress tracking
* Add a dashboard summary of project counts by status
* Improve image editing or image preview before upload

