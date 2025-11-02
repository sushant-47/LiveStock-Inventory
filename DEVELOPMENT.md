
### Approach
Used Angular CDK for integrating core UI elements - Table, Dialog, Accordion

Separate components are used for showing different pages like Add Cow Form, Cow Details page.

CSS Theming is added for consistency and branding.

Application uses Zoneless change detection to optimize performance and reduce bundle size.

### Design
Catalog application follows a modular design and clearly distinguishable folder structure.

The components, services, constants, enums, and other schematics related to Cow Catalog feature are kept at `app/features/bovine`.

Reusable styles and utility functions are kept at `app/styles` and `app/utils` paths respectively.

### Known Limitations
Routing is not added currently which can affect the user experience while navigating the application.

Data is matched based on a single character of search string.

### Improvement Areas
CDK components can be extended as a native library and customised for handling complex scenarios while controlling the UI behavior.
