(() => {
  // ns-hugo-imp:D:\Qsync\Webs\Blog\themes\jane\assets\js\initMobileNavbar.js
  var initMobileNavbar = () => {
    const mobileNav = document.getElementById("mobile-navbar");
    const mobileNavIcon = document.getElementById("mobile-navbar-icon");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuCloseModal = document.getElementById("mobile-menu-close-modal");
    mobileNavIcon.addEventListener("click", () => {
      mobileMenu.style.width = "80vw";
      mobileMenuCloseModal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
    mobileMenuCloseModal.addEventListener("click", () => {
      mobileMenu.style.width = "0";
      mobileMenuCloseModal.style.display = "none";
      document.body.style.overflow = "";
    });
    document.querySelectorAll(".mobile-submenu-open").forEach((submenuOpen) => {
      submenuOpen.addEventListener("click", function() {
        const mobileSubmenuList = document.querySelectorAll(".mobile-submenu-list");
        const mobileMenuParent = document.querySelectorAll(".mobile-menu-parent");
        if (this.parentElement.nextElementSibling.style.display === "none") {
          mobileSubmenuList.forEach((submenu) => {
            submenu.style.display = "none";
            submenu.style.height = "0px";
          });
          const nextUl = this.parentElement.nextElementSibling;
          nextUl.style.display = "block";
          nextUl.style.height = nextUl.scrollHeight + "px";
          this.parentElement.classList.add("mobile-submenu-show");
          mobileMenuParent.forEach((parent) => {
            if (parent !== this.parentElement) {
              parent.classList.remove("mobile-submenu-show");
            }
          });
        } else {
          const nextUl = this.parentElement.nextElementSibling;
          nextUl.style.height = "0px";
          setTimeout(() => {
            nextUl.style.display = "none";
          }, 300);
          this.parentElement.classList.remove("mobile-submenu-show");
        }
      });
    });
  };
  var initMobileNavbar_default = initMobileNavbar;

  // ns-hugo-imp:D:\Qsync\Webs\Blog\themes\jane\assets\js\initToc.js
  function createTocObserver() {
    const headings = document.querySelectorAll("article h1[id], article h2[id], article h3[id], article h4[id], article h5[id], article h6[id]");
    const setCurrentActive = () => {
      const allActive = document.querySelectorAll(`#TableOfContents .active`);
      if (allActive.length === 0) {
        return;
      } else {
        document.querySelector(`#TableOfContents .current`)?.classList.remove("current");
        document.querySelectorAll(`#TableOfContents .active`)[0]?.classList.add("current");
      }
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.intersectionRatio > 0) {
          document.querySelector(`#TableOfContents li a[href="#${id}"]`)?.parentElement?.classList.add("active");
        } else {
          document.querySelector(`#TableOfContents li a[href="#${id}"]`)?.parentElement?.classList.remove("active");
        }
        setCurrentActive();
      });
    });
    headings.forEach((section) => {
      observer.observe(section);
    });
  }
  var initToc = () => {
    const tocContainer = document.getElementById("toc");
    if (tocContainer !== null) {
      const toc = document.getElementById("TableOfContents");
      if (toc === null) {
        tocContainer.parentNode.removeChild(tocContainer);
      } else {
        createTocObserver();
      }
    }
  };
  var initToc_default = initToc;

  // ns-hugo-imp:D:\Qsync\Webs\Blog\themes\jane\assets\js\initHeaderAnchor.js
  var anchorForId = (id) => {
    var anchor = document.createElement("a");
    anchor.className = "header-link";
    anchor.href = "#" + id;
    anchor.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-2"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>';
    return anchor;
  };
  var linkifyAnchors = (level, containingElement) => {
    var headers = containingElement.getElementsByTagName("h" + level);
    for (var h = 0; h < headers.length; h++) {
      var header = headers[h];
      header.className = "post-content-header";
      if (typeof header.id !== "undefined" && header.id !== "") {
        header.appendChild(anchorForId(header.id));
      }
    }
  };
  var initHeaderAnchor = () => {
    var contentBlock = document.getElementsByClassName("post-content")[0];
    if (!contentBlock) {
      return;
    }
    for (var level = 1; level <= 4; level++) {
      linkifyAnchors(level, contentBlock);
    }
  };
  var initHeaderAnchor_default = initHeaderAnchor;

  // ns-hugo-imp:D:\Qsync\Webs\Blog\themes\jane\assets\js\initToggleTheme.js
  function initThemeToggle() {
    const html = document.documentElement;
    const themeToggles = document.querySelectorAll(".theme-toggle");
    function setTheme(theme) {
      html.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      if (window.REMARK42 && window.REMARK42.changeTheme) {
        try {
          window.REMARK42.changeTheme(theme);
        } catch (e) {
          console.error("Failed to update Remark42 theme:", e);
        }
      }
    }
    function toggleTheme() {
      const currentTheme = html.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(newTheme);
    }
    themeToggles.forEach((toggle) => {
      toggle.addEventListener("click", function(e) {
        e.preventDefault();
        toggleTheme();
      });
    });
  }
  var initToggleTheme_default = initThemeToggle;

  // ns-hugo-imp:D:\Qsync\Webs\Blog\themes\jane\assets\js\initCopyCode.js
  var initCopyCode = () => {
    const containers = document.querySelectorAll(".highlight-container");
    containers.forEach((container) => {
      const copyBtn = container.querySelector(".copy-code-btn");
      const codeElement = container.querySelector(".highlight code[data-lang]");
      copyBtn.addEventListener("click", function() {
        navigator.clipboard.writeText(codeElement.textContent).then(function() {
          copyBtn.blur();
          copyBtn.innerText = "Copied!";
          setTimeout(function() {
            copyBtn.innerText = "Copy";
          }, 2e3);
        }, function(error) {
          copyBtn.innerText = "Error";
        });
      });
    });
  };
  var initCopyCode_default = initCopyCode;

  // <stdin>
  async function initApp() {
    try {
      await initToggleTheme_default();
      await Promise.all([
        initMobileNavbar_default(),
        initToc_default(),
        initHeaderAnchor_default(),
        initCopyCode_default()
      ]);
      console.log("All modules initialized successfully");
    } catch (error) {
      console.error("Error occurred during initialization:", error);
    }
  }
  document.addEventListener("DOMContentLoaded", initApp);
})();
