---
layout: empty
permalink: sitemap.xml
---
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
{% for web-page in site.pages %}{% unless web-page.url contains "xml"%}{% unless web-page.url contains "css"%}{% unless web-page.url contains "404"%}{% unless web-page.url contains "json"%}
<url>
  <loc>https://copperi.ru{{web-page.url}}</loc>
  <lastmod>2018-04-20T07:25:37+00:00</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.00</priority>
</url>
{% endunless %}{% endunless %}{% endunless %}{% endunless %}{% endfor %}{% for web-page in site.catalog %}{% unless web-page.category %}
<url>
  <loc>https://copperi.ru{{web-page.url}}</loc>
  <lastmod>2018-04-20T07:25:37+00:00</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.00</priority>
</url>
{% endunless %}{% endfor %}</urlset>