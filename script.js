
document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            });
        });

        document.addEventListener("click", (event) => {
            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // Typing animation
    const typingText = document.getElementById("typingText");

    if (typingText) {
        const phrases = [
            "web experiences",
            "creative projects",
            "useful applications",
            "new possibilities"
        ];

        let phraseIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {
            const phrase = phrases[phraseIndex];

            if (deleting) {
                characterIndex--;
            } else {
                characterIndex++;
            }

            typingText.textContent = phrase.substring(0, characterIndex);

            let delay = deleting ? 45 : 85;

            if (!deleting && characterIndex === phrase.length) {
                deleting = true;
                delay = 1300;
            } else if (deleting && characterIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 350;
            }

            window.setTimeout(typeEffect, delay);
        }

        typeEffect();
    }

    // Reveal elements when they enter the viewport
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // Highlight the current navigation section
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navItems.forEach((link) => {
                            const isActive =
                                link.getAttribute("href") ===
                                `#${entry.target.id}`;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            {
                rootMargin: "-30% 0px -55% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // Automatic footer year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});
