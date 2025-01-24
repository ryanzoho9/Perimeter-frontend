# Perimeter Usage Guide
Perimeter is a web framework developed by Ryan Zohoury. Perimeter is currently dependent on jQuery but its usage will be phased out.
## Structure
Perimeter can be used to style and develop web sites and web apps. It contains a primary style sheet which contains basic styles and links to secondary style sheets. In addition to styling your website, Perimeter also uses JavaScript to configure various aspects of the website based on your configuration parameters. in the perimeter file there are four sub-directories which include styles, scripts, icons, and fonts.

In order to host perimeter on a server, you need to update some parameters. In each style sheet under perimeter/styles, update any import URLs, and the `perimeterOrigin` variable at the top of the perimeter/scripts/perimeter.js file in the same format with no trailing slash.
## Initial configuration examples

### HTML template
```
<!DOCTYPE html>
<!-- resource-name -->
<!-- Ryan Zohoury -->

<!-- Resource created by Ryan Zohoury on Jan 1, 2022. -->
<!-- Copyright © 2022 Ryan Zohoury. All rights reserved. -->

<html lang="en-US" prefix="og: http://ogp.me/ns#">
<head>
<!-- analytics -->

<!-- metadata -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="revisit-after" content="7 days">
<meta name="robots" content="noindex, nofollow">

<!-- description -->
<title>TITLE</title>
<meta name="description" content="DESCRIPTION">
<meta name="keywords" content="KEYWORDS">
<meta property="og:url" content="PAGEURL">
<meta property="og:site_name" content="TITLE">
<meta property="og:description" content="DESCRIPTION">
<meta property="og:image" content="/static/images/og-logo.png">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@RyanZohoury">
<meta name="twitter:creator" content="@RyanZohoury">

<!-- PWA -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="manifest" href="/static/manifest.json">

<!-- styles -->
<link rel="stylesheet" href="https://zohowww.com/static/perimeter/styles/styles.css">

</head>
<body>
<!-- hero -->

<!-- content -->
<main>
  
</main>

<!-- jQuery -->
<script src="https://zohowww.com/static/third-party/jquery/jquery.min.js"></script>

<!-- perimeter -->
<link rel="stylesheet" href="https://zohowww.com/static/perimeter/styles/perimeter.css">
<script src="https://zohowww.com/static/perimeter/scripts/perimeter.js"></script>

<!-- scripts -->

</body>
</html>
```
Feel free to modify this example as needed but use it as a general guideline for how your page should be structured. Your Perimeter configuration code should be placed after the perimeter.js script and can be optionally saved as its own .js file.

### Perimeter configuration example
```
perimeter = {
  navigation: {
    //add back insert in
    logo: "/logo.svg",
    logoLink: "https://example.com/",
    secondIcon: "share",
    secondIconImage: "",
    secondIconLink: "https://example.com/search/",
    topBuffer: false,
    items: {
      "Home": "https://example.com/",
      "About Us": "https://example.com/about/",
      "Contact Us": "https://example.com/contact/",
    },
    shareData: {
      title: "Website Name",
      text: "Short website description.",
      url: "https://example.com/",
    },
    mobile: {
      logo: "/logo.svg",
      showSecondIcon: true,
      transparantAtTop: 120,
      topBuffer: false,
    }
  },
  footer: {
    themeToggle: true,
    copyright: "Ryan Zohoury",
    items: {
      "Home": "https://example.com/",
      "Legal": "https://example.com/legal/",
      "Site Map": "https://example.com/sitemap/",
      "Feedback": "https://example.com/feedback/",
      "Newsletter": "https://example.com/newsletter/",
    },
    //contact: {
    //  phone: "",
    //  email: "",
    //  address: "",
    //},
    social: {
      twitter: "https://twitter.com/example",
      instagram: "https://www.instagram.com/example/",
      youtube: "https://www.youtube.com/c/example?sub_confirmation=1",
      facebook: "https://www.facebook.com/example/",
      map: "https://goo.gl/maps/8rgM7zKnDx2vSxRH6",
    }
  }
};
perimeterSetup();
```
All the fields listed are optional and can be modified as desired. You might find it useful to store parts of your configuration in a separate .js file such as the navigation and footer on home pages. The setup and script is described in further detail below.

Refer to the annotated configuration script below to understand what inputs are allowed and how they are processed.

## Styling
There are four separate CSS files which are used by Perimeter. First is the perimeter.css file which stores all the files for elements created and controlled by the perimeter.js script such as the navigation and footer, and modal. The perimeter.css styles will not be documented here as it is used programmatically, but if you link this single style sheet, it will also import styles.css which is a dependancy. Next, the styles.css file contains all of the basic styles including fonts and colors. It also imports inputs.css and ui.css. The inputs.css file contains UI input elements such as checkboxes and toggles. The ui.css file contains other UI element styles. Usage of the various styles and examples will be provided below.

## styles.css
### Normalizing
Perimeter removes most browser styles and relies on it being added back with custom classes. It is essential to add them back to ensure the site is properly usable.
### Fonts
Perimeter currently utilizes the Avenir Next font, however this may change in the future. It first attempts to see if the browser has the font locally before downloading it from the server or falling back on other sans-serif font options.

The default font styles can be referenced using `h1` or `.page-title`, `h2` or `.section-title`, `h3` or `.regular-header`, `h4` or `.small-header-bold`, `h5` or `.subtitle`, `h6` or `.body-text-large`, `p` or `label` or `.body-text`. Smaller text can be used with `small` or `.body-text-small` and hyperlinks or buttons can use `a` or `.button` which matches the paragraph font size.
### Colors
Colors are referenced as CSS variables using the `var(--variable)` format. Colors include `--light-blue`, `--ui-blue`, `--text-blue`, `--light-orange`, `--red`, `--red-warning`, and `--light-green`.
Grayscale fonts can be referenced in 10 intervals and range from `--gray-00` (black) to `--gray-100` (white).
The available grayscale colors with alpha are `--gray-80-a90`, `--gray-80-a85`, `--gray-80-a80`, `--gray-20-a90`, `--gray-20-a85`, `--gray-20-a80` with the second value representing the opacity.
When dark mode is enabled, all colors are inverted to their opposite value in the 00-100 scale, however they can keep the same value by adding the `.dark` class to the element and using the inverted color but keep in mind that this will apply to all children. SVG icons can be inverted in dark mode using `.dark-invert` or convert the SVG image to raw SVG with the `.toSVG` class then handle the dark mode style manually.
### Text styling
The available text styling classes are `.bold`, `.underline`, `.italic`, `.text-center`. To prevent the user from being able to select and copy text use `.no-copy`.
### Unordered lists
To create an unordered list, add either `.list-dash`, `.list-dash-long`, `.list-bullet`, or `.list-space` to an unordered list tag such as `<ul class="list-dash">`. To create an unordered list with our any list style for accessibility reasons use `.destyle-list`.
### Flex containers
To create a flex container use `.flex`, `.flex-space-between`, `.flex-space-around`, `.flex-space-evenly`, `.flex-start`, `.flex-center,` `.flex-end`. Use `.flex-column` to set the flex direction to column, `.flex-wrap` to allow content to wrap onto multiple lines, or `.flex-align-center` to align the content to the center vertically.
### Margins, paddings, widths, etc.

### Visibility

### Line dividers

### Custom scrolling

### Buttons

### Animations

## inputs.css
### Radio button
To add a radio button, use the following template.
```
<input class="radio" type="radio" name="NAME" id="NAME">
<label for="NAME">NAME</label>
```

### Checkbox
To add an inline checkbox, use the following template.
```
<input class="checkbox" type="checkbox" id="NAME" name="NAME" value="NAME" required>
<label style="margin: 10px 0 60px 0;" for="NAME">NAME</label>
```
To add an independant checkbox, use the following template.
```
<input class="checkbox" type="checkbox" id="NAME" name="NAME" value="NAME" required>
<label style="margin: 10px 0 60px 0;" for="NAME"></label>
```

### Checkbox slide toggle
To add a checkbox slide toggle, use the following template.
```
<input type="checkbox" name="NAME" id="NAME" class="checkToggle">
<label for="NAME">NAME <span class="checkToggleBtn"></span></label>
```

### File input
To add a file input, use the following template.
```
<label for="NAME" style="display:inline-block;margin-bottom: 12px;">NAME<span style="color: red">&nbsp;*</span><p class="SmallText Grey7" style="margin-top: 4px;">DESCRIPTION</p><span class="APullInTint" style="border: 3px solid #EEEEEE;border-radius: 10px;background-color: #eee;width: 240px;
  display: inline-block;text-align: center;padding: 3px 0 3px 0;margin: 6px 0 46px 0;">Choose or drag file</span></label>
<input type="file" id="NAME" name="NAME" style="display: none;" multiple accept="TYPE" required>
```

### Single-line text input
To add a single-line text input, use the following template.
```
<label for="NAME" style="display: inline-block; margin-bottom: 12px;">NAME<span style="color: red">*</span></label>
<input class="text-input body-text width-100" placeholder=" " type="text" id="NAME" name="NAME" required>
```

### Longer text input
To add a longer text input, use the following template.

### Submit button

## ui.css

### Line iten

### Cards

### 

### 

## Usage and other examples
To prevent bots from indexing a page or directory add the following as a robots.txt file. Leave it as is to prevent indexing the entire domain or add specific directories or files on individual lines.
```
User-agent: *
Disallow: /
```

### Implementing dark mode
By default, there is a theme modal that can be called with `showModal("modalTheme")` and is typically included in the footer. In pages without a footer the functionality could be replicated by copying the markdown of the toggles and labels. Design sites for the light theme first. For styling elements with light and dark themes use the CSS variables.
### Analytics
Use Google Analytics

### Embedding iframes
For iframes with a specific size use the following example.
```

```
For iframes with a specific aspect ratio use the following example.
```
<div class="frame-wrapper">
  <iframe loading="lazy" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" crossorigin="anonymous" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" src=""></iframe>
</div>
```
Add `style="padding-bottom: 56.25"` for a 16:9 aspect ratio or for a custom ratio you can experiment with values or calculate it by dividing the height by the width then multiplying by 100.
### Class order and usage

### Hero
To add a general logo hero, use the following template.
```

```
To add a general hero with a background, use the following template.
```
<header class="image-hero">
  <div class="image-hero" id="topHeroParallax image-hero-parallax">
    <img src="/static/images/site-hero.jpg" class="image-hero-background" alt="page hero image">
    <div class="image-hero-contents image-hero-background-filter" id="image-hero-fade">
      <img src="https://console.la/static/logo/Console%20Logo.svg" class="image-hero-logo no-copy toSVG" alt="logo">
      <h5 class="PTPaddingSubtitle no-copy Grey3" style="color: #F4F4F4; text-shadow: 0 0 8px #333333;" class="heroSubtitle">SUBTITLE</h5>
    </div>
  </div>
</header>
For paralax effect .
```
To add a page text hero, use the following template.
```

```
### Form
(how to format layout, classes, etc)

## PWA setup
Create a manifest.json file and add the proper metadata to all pages. For iOS it is easier to add a 180x180 image titled "apple-touch-icon.png" to the base directory of your site, however don't forget to add the proper icons for other devices and slash screens if desired.

To configure the PWA with Perimeter

## Icons
In the "icons" folder, there are two additional folders titled "ui" and "social" which contains SVG icons which are used by Perimeter and can be referenced in the page.

The icons available in perimeter/icons/ui are:
- 3d-cube.svg
- apps.svg
- car.svg
- close-x.svg
- corners.svg
- dollar.svg
- download-blue.svg
- download.svg
- house.svg
- left-arrow.svg
- left-carot-circle.svg
- map-pin.svg
- maximize.svg
- paw.svg
- play-narrow.svg
- propagating-waves.svg
- quote.svg
- right-arrow.svg
- right-carot-circle.svg
- search.svg
- settings.svg
- share-tall.svg
- share.svg
- speaker.svg
- weather-cloud.svg

The icons available in perimeter/icons/social are:
- facebook.svg
- instagram.svg
- map.svg
- tesla.svg
- twitter.svg
- youtube.svg

## Perimeter script
### Initialization

### Navigation

### Footer

### PWA

### Date and time

### Modal

### URL variables

### User location

### Convert to SVG

### Theme

## Form validation script

### Required inputs

### Input validation while typing

### Input validation and sanitation before submitting

## Service worker script

### Server configuration
All sites and pages must be forced to use https. Setting up Let's Encrypt on the server is recommended to always keep the certificate updated. Each domain and sub-domain will need to be verified. This configuration assumes all sites are stored in a directory with the name of the domain at /web/sites/example.com.

On an Apache server, configure the primary /etc/apache2/apache2.conf file to link to a secondary configuration file with the following.
```
LoadModule headers_module /usr/lib/apache2/modules/mod_headers.so

# Primary Configuration File
IncludeOptional /web/config/*.conf
```
Then add the directory with the following.
```
# Primary directory
<Directory /web/sites/>
        Options FollowSymLinks
        AllowOverride All
        Require all granted
</Directory>
```

In the sites.conf file add the following to the top.
```
<IfModule mod_headers.c>
    Header unset ETag
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires 0

    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set Strict-Transport-Security "max-age=19440000; includeSubDomains"
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

For each page add the following configuration. Keep in mind you will need to allow http when configuring Let's Encrypt.
```
  <VirtualHost *:80>
      ServerName example.com
      RewriteEngine on
      RewriteCond %{SERVER_NAME} =example.com
      RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
  </VirtualHost>
  <IfModule mod_ssl.c>
  <VirtualHost *:443>
      ServerName example.com
      DocumentRoot "/web/sites/example.com"
      DirectoryIndex index.html index.php

  SSLCertificateFile /etc/letsencrypt/live/example.com/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/example.com/privkey.pem
  Include /etc/letsencrypt/options-ssl-apache.conf
  </VirtualHost>
  </IfModule>
```

On an Apache server, use the following templates as references for configuring .htaccess files.
```
ErrorDocument 404 https://example.com/home?errorURI=%{REQUEST_URI}&error=e404
ErrorDocument 403 https://example.com/home?errorURI=%{REQUEST_URI}&error=e403
ErrorDocument 500 https://example.com/home?errorURI=%{REQUEST_URI}&error=e500
```
```
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
</IfModule>

Header set Access-Control-Allow-Origin "*"

Header always set Strict-Transport-Security "max-age=10886400; includeSubDomains; preload"
```
```
<IfModule mod_headers.c>
    Header unset Cache-Control
    Header unset Expires

    Header set Cache-Control "no-cache, must-revalidate, max-age=172800"

    Header set Pragma "no-cache"
</IfModule>
```
1 hour is 3600, 2 hours is 7200, 6 hours is 21600, 24 hours is 86400, 48 hours is 172800, 7 days is 604800.

The following should rarely need to be used but can be added to redirect if user agent doesn't contain string.
```
<If "%{HTTP_USER_AGENT} !~ /String/">
  RedirectMatch 301 ^/$ /home/
</If>
```
### Git configuration
Add the following to the .gitignore file.
```
.DS_Store
/Ignored
.env
```