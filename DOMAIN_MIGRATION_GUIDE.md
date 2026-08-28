# Domain Migration & SEO Action Plan: `rearecon.me` to `rearglobal.com.np`

To transfer all search authority and ranking signals for searches like **"rear econ"** from `rearecon.me` to `rearglobal.com.np` before `rearecon.me` expires, complete the following steps:

---

## 1. 301 Permanent Redirects (Crucial)
While `rearecon.me` is still active, configure a **HTTP 301 Permanent Redirect** from `rearecon.me` (and all its paths) to `https://rearglobal.com.np/`.

### How to configure:
* **Cloudflare / DNS Provider:**
  Add a Page Rule or Redirect Rule:
  * Pattern: `*rearecon.me/*`
  * Action: `301 Permanent Redirect`
  * Destination: `https://rearglobal.com.np/$2` (or `https://rearglobal.com.np/`)

* **Nginx Server:**
  ```nginx
  server {
      server_name rearecon.me www.rearecon.me;
      return 301 https://rearglobal.com.np$request_uri;
  }
  ```

* **Apache (`.htaccess`):**
  ```apache
  RewriteEngine On
  RewriteCond %{HTTP_HOST} ^rearecon\.me$ [OR]
  RewriteCond %{HTTP_HOST} ^www\.rearecon\.me$
  RewriteRule ^(.*)$ https://rearglobal.com.np/$1 [R=301,L]
  ```

---

## 2. Google Search Console - Change of Address Tool
1. Register and verify both properties in [Google Search Console](https://search.google.com/search-console):
   * `https://rearecon.me`
   * `https://rearglobal.com.np`
2. Go to the property settings for `https://rearecon.me`.
3. Select **Change of Address**.
4. Choose `https://rearglobal.com.np` as the target site and submit the request.
   *(This explicitly tells Google to transfer search rankings to the new domain immediately.)*

---

## 3. Google Search Console - Submit Sitemap
1. Go to Google Search Console for `https://rearglobal.com.np`.
2. Under **Sitemaps**, submit: `https://rearglobal.com.np/sitemap.xml`.
3. Request indexing for the homepage (`https://rearglobal.com.np`).

---

## 4. Social Media & External Profile Updates
Update website links on all social platforms and profiles to point directly to `https://rearglobal.com.np`:
- LinkedIn (Company page & founder profiles)
- Instagram bio (`@rearecon2025`)
- Facebook page
- YouTube channel (`@REAREcon`)

---

## Summary of Codebase Enhancements Made
- **JSON-LD Structured Data (`index.html`):**
  Added `alternateName: ["Rear Econ", "REAR Econ", "Rear Global Nepal", "Rear Econ Nepal"]` and set department URL to `https://rearglobal.com.np`.
- **Meta Tags & Titles:**
  Updated titles, descriptions, OpenGraph, Twitter cards, and canonical tags across `index.html`, `aemm.html`, `tlae.html`, `twg.html`, and `alumni.html` to focus on "Rear Econ | Rear Global".
- **Robots & Sitemap:**
  Created `sitemap.xml` and `robots.txt` for crawler indexing.
