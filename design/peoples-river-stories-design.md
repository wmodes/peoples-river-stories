### **Peoples River Stories -- Project Summary**

**Peoples River Stories** is an *interactive, participatory new media project* that invites people from across the globe to contribute their personal, historical, or imagined stories about rivers. It builds on the legacy and conceptual framework of *Secret History* (a decade-long research and documentary project focused on untold stories along American rivers) but explicitly expands the frame beyond the U.S. to include *international river narratives*.

This new platform is a **web-based map** where users can drop pins at locations along rivers and submit text-based stories. The experience is designed to be intimate, poetic, and reflective---focusing on how rivers are entangled with human memory, labor, joy, grief, displacement, resilience, and place.

The URL is https://map.peoplesriverhistory.org

* * * * *

### **Conceptual Goals**

-   **Memory as Geography:** The platform treats storytelling as a form of mapping, where emotional, historical, and personal memory becomes part of the landscape.

-   **Resistance to Erasure:** Like *Secret History*, the project resists dominant, top-down historical narratives by prioritizing individual voices, especially those from marginalized or overlooked communities.

-   **Participation as Art:** Inspired by participatory media and social practice art traditions, users co-create the archive, shifting the artist's role toward facilitation and curation.

-   **International Commons:** While rooted in American river history, this iteration is global in scope, inviting contributions from any river in the world.

-   **Digital Storytelling:** Built as a web-based new media artwork, it explores how digital interfaces can serve poetic, archival, and communal purposes simultaneously.

* * * * *

### **Technical Foundation**

-   **Base Code:** Forked from the *Queering the Map* project, preserving its use of SvelteKit and participatory map interaction patterns.

-   **Hosting:** Deployed using **Caddy** as the web server and **Node/SvelteKit** as the SSR backend.

-   **Database:** Switched from Supabase to **MySQL**, with a simplified schema consisting of three tables: `moments`, `votes`, and `moderators`. Supabase remains preserved in the `switch2supabase` branch.

-   **Data Flow:**

    -   Markers are added through a submission interface and stored in the database as `pending`.

    -   Manual approval is required (`pending` → `approved`) via SQL.

    -   Approved moments are fetched and saved to static files (`moments.json`, `descriptions.json`) using `npm run fetch-data`.

-   **Frontend:** Uses SvelteKit static generation for fast loading, except for dynamic server-side routes like `/moment/:id` for fetching individual descriptions.

-   **Captcha:** Cloudflare Turnstile is integrated to prevent spam.

-   **Moderation:** Minimal at this stage; moderation tools may be built later.

-   **Fallbacks & Logging:** Caddy handles fallback routing and logs to a rotating access log.

* * * * *

### **User Flow & Experience**

1.  **Visitor arrives** at [map.peoplesriverhistory.org](https://map.peoplesriverhistory.org).

2.  They explore an interactive map filled with community-submitted river stories.

3.  Clicking a pin fetches a poetic or personal narrative via `/moment/:id`.

4.  Users are invited to **add their own stories**, which are submitted through a simple form.

5.  Submissions are stored in the database as `pending`.

6.  A moderator later approves valid entries.

7.  Periodic builds fetch approved data into static files to update the public map.

* * * * *

### **Tone and Voice**

-   Reflective, intimate, and poetic

-   Welcomes both vulnerability and eccentricity

-   Values lived experience, oral history, and local knowledge

-   Uses clean, minimal, almost archival design to foreground the stories

-   Avoids heavy explanation---trusts users to explore and discover meaning