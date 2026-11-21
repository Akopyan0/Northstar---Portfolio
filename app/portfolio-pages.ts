export type PageKind="pricing"|"services"|"specialty"|"process"|"studio"|"contact"|"faq"|"work"|"case"|"legal"|"legal-hub";
export type ContentBlock={title:string;body:string};
export type PageSpec={
 slug:string;kind:PageKind;eyebrow:string;title:string;accent:string;intro:string;aside:string;
 lead?:string;benefits?:ContentBlock[];steps?:ContentBlock[];faq?:ContentBlock[];tags?:string[];
 project?: "crm"|"support"|"restaurant"|"automation"; disclaimer?:string;
};
const page=(p:PageSpec):PageSpec=>p;
export const pageRegistry:Record<string,PageSpec>={
 "pricing":page({slug:"pricing",kind:"pricing",eyebrow:"INVESTMENT / 01",title:"Transparent scope. Thoughtful investment.",accent:"THE RIGHT FIT.",intro:"A useful starting point for planning a website or business tool. Clear deliverables, no surprise upgrades.",aside:"ESTIMATES / USD",lead:"All prices below are indicative starting points—not binding offers. A written scope and quote come before any paid work.",faq:[
 {title:"Are these fixed prices?",body:"No. Prices are illustrative, not a checkout or binding quotation. Integrations, data complexity, hosting and design requirements change the cost."},
 {title:"Are hosting and subscriptions included?",body:"No. Hosting, domains, third-party API usage, transaction fees and ongoing maintenance are quoted separately unless agreed in writing."},
 {title:"Can I start with one feature?",body:"Yes. A scoped first milestone can validate the idea before expanding it."},
 {title:"Do you support revisions?",body:"Revisions and handover expectations are defined in each written project scope."}
 ],tags:["LANDING PAGES","INTERNAL TOOLS","AUTOMATION","CUSTOM PROJECTS"]}),
 "services":page({slug:"services",kind:"services",eyebrow:"CAPABILITIES / 02",title:"Practical digital tools, made remarkable.",accent:"BUILT TO WORK.",intro:"From a focused landing page to a workflow tool with a real backend. Work begins with the problem, not a template.",aside:"DESIGN / CODE / DELIVERY",benefits:[
 {title:"Web experiences",body:"Responsive marketing sites and product frontends with coherent art direction, accessibility considerations and performance in mind."},
 {title:"Business systems",body:"Dashboards, CRM-style workflows, data models, forms, exports and the interfaces teams use every day."},
 {title:"Automation",body:"Python and API-based tools that clean files, connect systems and reduce repetitive manual steps."},
 {title:"Support experiences",body:"Knowledge-base search, customer-facing help interfaces and escalation workflows; LLM features only when explicitly scoped."},
 ],tags:["DESIGN","DEVELOPMENT","AUTOMATION","DATA"]}),
 "web-design":page({slug:"web-design",kind:"specialty",eyebrow:"CAPABILITY / WEB",title:"A website with its own point of view.",accent:"NOT ANOTHER TEMPLATE.",intro:"Expressive typography, deliberate grids, responsive composition and thoughtful micro-interactions—built for clarity and conversion.",aside:"NEXT.JS / REACT / UI",benefits:[
 {title:"Art direction",body:"Moodboards, typographic hierarchy, brand-aware palettes, and modular page systems."},
 {title:"Responsive execution",body:"Layouts conceived for desktop, tablet and mobile, not simply squeezed down."},
 {title:"Motion with purpose",body:"Transitions that clarify state and movement; reduced-motion alternatives and no pointless jumping."},
 {title:"Usable content structure",body:"Navigation, calls to action, metadata and accessible interactive elements."}
 ],steps:[{title:"Discover",body:"Define the audience, page inventory and essential action."},{title:"Design",body:"Establish system, art direction and responsive layouts."},{title:"Build",body:"Implement and test the interaction and delivery."}],tags:["WEB DESIGN","LANDING PAGE","NEXT.JS","UI / UX"]}),
 "automation":page({slug:"automation",kind:"specialty",eyebrow:"CAPABILITY / AUTOMATION",title:"Less repetition. More room to think.",accent:"MAKE TIME BACK.",intro:"Data pipelines, Python tools and practical automations designed around the work people already do.",aside:"PYTHON / CSV / APIS",benefits:[
 {title:"File workflows",body:"Parse, validate, clean, deduplicate and export CSV; Excel/PDF support is scoped separately."},
 {title:"Connected operations",body:"Integrations with supported external services via documented APIs and authenticated connections."},
 {title:"Transparent execution",body:"Clear job states, progress, failures and human-readable reports."},
 {title:"Responsible handling",body:"Input validation, data minimization and explicit limits on uploaded content."}
 ],steps:[{title:"Map",body:"Identify repetitive work and failure cases."},{title:"Prove",body:"Run a small input sample end to end."},{title:"Deliver",body:"Add validation, handling and a usable control surface."}],tags:["PYTHON","API","CSV","WORKFLOW"]}),
 "ai-support":page({slug:"ai-support",kind:"specialty",eyebrow:"CAPABILITY / SUPPORT",title:"Answers that earn the next question.",accent:"HUMAN FIRST.",intro:"Build useful support experiences before adding buzzwords: searchable knowledge, clear answers, and a path to a person.",aside:"KNOWLEDGE / CHAT / UX",benefits:[
 {title:"Searchable answers",body:"Curated articles, clear categories, and an interface that is quick to understand."},
 {title:"Conversation history",body:"Context and session continuity where technically and legally appropriate."},
 {title:"Honest limitations",body:"A visible fallback when the knowledge base does not contain a reliable answer."},
 {title:"Optional LLM",body:"External models can be integrated in a separately scoped build with privacy, cost and quality controls."}
 ],tags:["CHAT","KNOWLEDGE BASE","HUMAN ESCALATION","OPTIONAL AI"]}),
 "dashboards":page({slug:"dashboards",kind:"specialty",eyebrow:"CAPABILITY / SYSTEMS",title:"Better decisions start with legible data.",accent:"SIGNAL OVER NOISE.",intro:"Interfaces where every number belongs: operations, sales workflows, exportable records and clear, readable charts.",aside:"CRM / REPORTING / DATA",benefits:[
 {title:"Actionable metrics",body:"Readable charts and totals derived from real application state rather than decorative values."},
 {title:"Hands-on workflows",body:"Create and update entries, track status and navigate records with keyboard-friendly controls."},
 {title:"Data export",body:"Lightweight exports when teams need to move records into other tools."},
 {title:"A credible foundation",body:"Validation, persistence options and clear distinction between demo features and production requirements."}
 ],tags:["BUSINESS UI","CRM","ANALYTICS","EXPORT"]}),
 "restaurant-websites":page({slug:"restaurant-websites",kind:"specialty",eyebrow:"CAPABILITY / HOSPITALITY",title:"Give guests a reason to stay.",accent:"BEFORE THEY ARRIVE.",intro:"Atmospheric restaurant websites where food, place, photography and the reservation journey feel like one experience.",aside:"HOSPITALITY / BOOKINGS",benefits:[
 {title:"An editorial first impression",body:"Menus and photography presented with restraint, not stock-template decoration."},
 {title:"Useful information",body:"Hours, address, dietary notes and a navigation hierarchy that answers real guest questions."},
 {title:"Booking flows",body:"Capacity-aware demo reservation logic or real provider integrations when available and scoped."},
 {title:"Mobile experience",body:"Designed for guests searching while moving, with fast access to the menu and contact details."}
 ],tags:["RESTAURANTS","MENUS","RESERVATIONS","MOBILE"]}),
 "process":page({slug:"process",kind:"process",eyebrow:"THE METHOD / 03",title:"A good process is visible.",accent:"FROM THE START.",intro:"Clear decisions, small verifiable milestones and room for feedback. No mystery behind a progress bar.",aside:"DISCOVER / BUILD / VERIFY",steps:[
 {title:"Understand the problem",body:"Identify user goals, constraints, data and what a successful result means."},
 {title:"Map the experience",body:"Define pages, core flows, states, accessibility and visual direction."},
 {title:"Build the smallest useful version",body:"Implement working behavior before expanding into secondary features."},
 {title:"Test the real journey",body:"Validate form states, APIs, mobile layout and errors—rather than relying solely on a successful build."},
 {title:"Document and hand over",body:"Explain configuration, known limitations, and practical next steps."}
 ],tags:["DISCOVERY","SYSTEMS","IMPLEMENTATION","REVIEW"]}),
 "studio":page({slug:"studio",kind:"studio",eyebrow:"ABOUT NORTHSTAR / 04",title:"Independent thinking. Useful execution.",accent:"NO EMPTY GESTURES.",intro:"Northstar Studio is a showcase of design-forward web development and practical digital products. It is not a claim of a large agency or an invented client roster.",aside:"INDEPENDENT / DIGITAL STUDIO",benefits:[
 {title:"Character before decoration",body:"A recognizable visual language rooted in the subject—not a generic collection of gradients and cards."},
 {title:"Honesty about the demo",body:"Each public showcase identifies what is functional and what still requires production infrastructure."},
 {title:"The useful details",body:"Forms, loading states, accessible labels, reliable APIs and readable documentation count as design."}
 ],tags:["INDEPENDENT","TRANSPARENT","PRACTICAL"]}),
 "contact":page({slug:"contact",kind:"contact",eyebrow:"START A CONVERSATION / 05",title:"Something interesting on your mind?",accent:"TELL THE STORY.",intro:"Share what you are making, the outcome you want, and the constraints. Use the brief builder to prepare a clear first message.",aside:"NO FORM DATA SENT / COPY ONLY",tags:["PROJECT BRIEF","GITHUB","COLLABORATION"]}),
 "faq":page({slug:"faq",kind:"faq",eyebrow:"GOOD QUESTIONS / 06",title:"The details make the difference.",accent:"ASK BETTER.",intro:"Answers about scope, prototypes, hosting, pricing and what the public demos actually do.",aside:"WORK / DELIVERY / DEMOS",faq:[
 {title:"Are the four showcased projects finished SaaS products?",body:"No. They are interactive portfolio demonstrations. Some workflows have a server component; they do not imply production-ready security, authentication, billing, or third-party service integration."},
 {title:"Can you build a similar experience for a real business?",body:"A project can be scoped based on business requirements. The portfolio illustrates capabilities and starting patterns rather than a turnkey product guarantee."},
 {title:"Is the chatbot a generative AI model?",body:"The public Mellow demo currently uses a searchable knowledge base, with fallback handling. A connected language model is a separate feature."},
 {title:"Does the restaurant demo create real bookings?",body:"No. Sorelle provides a simulated, capacity-aware reservation workflow. It does not contact a real restaurant."},
 {title:"What happens to a CSV upload?",body:"The Flowstate demo sends CSV text to the server for in-memory parsing, cleaning and deduplication. It does not persist the CSV through that endpoint."},
 {title:"Where do demo CRM and chat changes go?",body:"The application can save demo workspace data to a private, session-specific Vercel Blob store, with browser-local fallback when configured."},
 {title:"Can I see the source code?",body:"Yes. This portfolio is public on GitHub. The repository is linked throughout the site."},
 {title:"What does a quote include?",body:"Scope, assumptions, deliverables, milestones and revisions should be specified in a separate written proposal."},
 ],tags:["FAQ","SCOPE","PRIVACY","SUPPORT"]}),
 "work":page({slug:"work",kind:"work",eyebrow:"SELECTED WORK / 07",title:"Four ideas. Four distinct systems.",accent:"EXPLORE THE WORK.",intro:"A curated collection of functional demos with different use cases, interactions and technical considerations.",aside:"04 PUBLIC EXPERIMENTS",tags:["MERIDIAN","MELLOW","SORELLE","FLOWSTATE"]}),
 "case-meridian":page({slug:"case-meridian",kind:"case",eyebrow:"CASE STUDY / 01",title:"Making a sales pipeline feel legible.",accent:"MERIDIAN.",intro:"A CRM-style dashboard demonstration that places opportunities, totals and stages in one workspace.",aside:"CRM / DASHBOARD",project:"crm",lead:"This is an illustrative portfolio build, not a claim of commissioned client work.",benefits:[
 {title:"The brief",body:"Design a compact sales workflow with clear metrics and practical controls for opportunity management."},
 {title:"What works",body:"Create and delete opportunities, change pipeline stages, search contacts and export the dataset to CSV."},
 {title:"Beyond the visual",body:"Totals and stage distribution are derived from the demo records; workspace state can use session-based storage."},
 {title:"For a production system",body:"Authentication, authorization, audit logs, secure tenancy and integrations would be scoped separately."}
 ],tags:["CRM","DASHBOARD","DATA"]}),
 "case-mellow":page({slug:"case-mellow",kind:"case",eyebrow:"CASE STUDY / 02",title:"Good answers, without the wait.",accent:"MELLOW.",intro:"A support interface powered by a searchable, editable knowledge base, without pretending to be a connected LLM.",aside:"SUPPORT / KNOWLEDGE",project:"support",lead:"This is an illustrative portfolio build, not a claim of commissioned client work.",benefits:[
 {title:"The brief",body:"Make repetitive support questions easy to answer while keeping the conversation approachable."},
 {title:"What works",body:"A knowledge base, chat history, suggested questions and fallback behavior when the answer is unknown."},
 {title:"Designed for trust",body:"The interface does not invent unsupported answers and can suggest involving a human."},
 {title:"For a production system",body:"An operator inbox, identity, monitoring and optional model integrations would require a dedicated implementation."}
 ],tags:["SUPPORT","CHAT","UX"]}),
 "case-sorelle":page({slug:"case-sorelle",kind:"case",eyebrow:"CASE STUDY / 03",title:"Hospitality starts before the door.",accent:"SORELLE.",intro:"A visual restaurant concept with a sample menu and a simulated table reservation flow.",aside:"RESTAURANT / RESERVATIONS",project:"restaurant",lead:"This is an illustrative portfolio build. No real restaurant is accepting reservations here.",benefits:[
 {title:"The brief",body:"Use editorial visual hierarchy to make the menu, atmosphere and booking journey coherent."},
 {title:"What works",body:"Browse menu content and create capacity-checked reservations within the demo."},
 {title:"Designed for guests",body:"The menu and key actions remain readable without requiring a desktop-sized viewport."},
 {title:"For a production system",body:"Real availability, provider sync, email confirmations and payments would need verified integrations."}
 ],tags:["HOSPITALITY","BOOKING","WEB"]}),
 "case-flowstate":page({slug:"case-flowstate",kind:"case",eyebrow:"CASE STUDY / 04",title:"A cleaner path from input to output.",accent:"FLOWSTATE.",intro:"A CSV-cleaning workflow with visual execution states and actual server-side parsing.",aside:"AUTOMATION / CSV",project:"automation",lead:"This is an illustrative portfolio build, not a claim of commissioned client work.",benefits:[
 {title:"The brief",body:"Make a routine data task approachable without requiring a technical user to open a terminal."},
 {title:"What works",body:"Paste or upload CSV, run server-side trimming and deduplication, preview the result and download the cleaned output."},
 {title:"Designed for transparency",body:"The workflow shows input, transformation and output stages rather than an ambiguous loading spinner."},
 {title:"Limits",body:"The current demo caps CSV files at 100 KB and 2,000 rows. Larger formats and scheduled jobs need a separate backend."}
 ],tags:["CSV","PYTHON IDEAS","BACKEND"]}),
 "privacy":page({slug:"privacy",kind:"legal",eyebrow:"POLICIES / PRIVACY",title:"A clear picture of demo data.",accent:"PRIVACY.",intro:"An informative overview of how the current public portfolio demo handles browser settings, workspace data and CSV processing.",aside:"INFORMATIONAL / 2026",disclaimer:"This is a description of the portfolio's current implementation, not a jurisdiction-specific legal opinion or promise of regulatory compliance.",benefits:[
 {title:"Browser preferences",body:"The selected light-green color theme is saved in localStorage so your preference can remain after refreshing."},
 {title:"Demo workspace sessions",body:"The workspace API uses a randomly generated HTTP-only session cookie that can persist up to 30 days. Session-specific CRM, knowledge, chat and booking data may be stored in private Vercel Blob when the storage service is configured."},
 {title:"CSV processing",body:"CSV content is sent to the /api/automation endpoint and processed in memory. That endpoint does not intentionally store the submitted file; normal infrastructure logs may still record request metadata."},
 {title:"Third-party services",body:"The site is hosted on Vercel and loads web fonts and a restaurant visual from third-party providers. External sites linked here have their own policies."},
 {title:"Data limitations",body:"Do not enter passwords, medical records, identity documents, confidential customer information or other sensitive material into public demonstrations."},
 {title:"Requests and corrections",body:"For repository-related questions, use the linked GitHub profile. A formal controller/contact address and retention schedule should be established before using this as a production commercial privacy notice."}
 ],tags:["SESSIONS","BROWSER","DATA"]}),
 "terms":page({slug:"terms",kind:"legal",eyebrow:"POLICIES / TERMS",title:"Simple terms for a public showcase.",accent:"TERMS.",intro:"The Northstar site demonstrates interface patterns and technical ideas. Using a demo does not create a client contract.",aside:"INFORMATIONAL / 2026",disclaimer:"Draft informational terms for a portfolio showcase. A qualified legal review is appropriate before commercial use.",benefits:[
 {title:"Demonstration only",body:"CRM records, menus, bookings and support answers may be illustrative. The site does not provide a live restaurant booking, a guaranteed AI support agent or a production CRM service."},
 {title:"No guaranteed availability",body:"Demo functionality, temporary data and third-party services may change or be interrupted."},
 {title:"Acceptable use",body:"Please do not submit unlawful, confidential or sensitive information, attempt to overwhelm the endpoints, or interfere with other users."},
 {title:"Separate project agreements",body:"Any paid development work requires a separate written scope describing deliverables, price, timing, ownership and revision expectations."},
 {title:"Source code",body:"The GitHub repository has its own license. The code license and third-party media licenses are separate from these website terms."}
 ],tags:["SHOWCASE","SCOPE","LICENSES"]}),
 "accessibility":page({slug:"accessibility",kind:"legal",eyebrow:"POLICIES / ACCESSIBILITY",title:"Interfaces should work for more people.",accent:"ACCESS.",intro:"Accessibility is an ongoing engineering practice, not a badge we can award ourselves.",aside:"BEST EFFORT / 2026",disclaimer:"No independent accessibility audit or formal WCAG certification is claimed for the current portfolio.",benefits:[
 {title:"Motion preferences",body:"The site aims to respect reduced-motion settings for decorative transitions, looping animations and visual reveal effects."},
 {title:"Keyboard navigation",body:"Buttons, tabs and navigation links are built with interactive HTML controls where possible. The new carousels support button navigation."},
 {title:"Contrast and readability",body:"Text hierarchy and contrast are part of the design process, though exact ratios still require independent verification across states."},
 {title:"Known gaps",body:"Complex data demonstrations, external media and dynamic widgets may need further assistive-technology and device testing."},
 {title:"Feedback",body:"Share a reproducible issue through the linked GitHub repository or profile."}
 ],tags:["KEYBOARD","MOTION","CONTRAST"]}),
 "legal":page({slug:"legal",kind:"legal-hub",eyebrow:"POLICIES / INDEX",title:"The details deserve daylight.",accent:"LEGAL & ACCESS.",intro:"A straightforward index of the site's informational policies, limitations and transparency notes.",aside:"POLICIES / NORTHSTAR",benefits:[
 {title:"Privacy",body:"Browser preferences, demo sessions and server-side processing."},
 {title:"Terms",body:"What the showcase is—and is not—intended to provide."},
 {title:"Accessibility",body:"Current accessibility choices, motion preferences and known limitations."}
 ],tags:["PRIVACY","TERMS","ACCESSIBILITY"]}),
};
export const allPages=Object.values(pageRegistry);
export const pageGroups=[
 {title:"START HERE",links:["services","pricing","process","contact"]},
 {title:"CAPABILITIES",links:["web-design","automation","ai-support","dashboards","restaurant-websites"]},
 {title:"STUDIO",links:["studio","work","faq"]},
 {title:"CASE STUDIES",links:["case-meridian","case-mellow","case-sorelle","case-flowstate"]},
 {title:"POLICIES",links:["legal","privacy","terms","accessibility"]}
];
