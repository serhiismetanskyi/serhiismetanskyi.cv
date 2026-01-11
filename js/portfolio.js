// Portfolio page scripts

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Zoom functions for Mermaid diagrams
function zoomMermaid(button, factor) {
   const container = button.closest('.mermaid-container');
   const mermaidDiv = container.querySelector('.mermaid');
   const zoomInfo = container.querySelector('.mermaid-zoom-info');
   const currentZoom = parseFloat(mermaidDiv.getAttribute('data-zoom')) || 1;
   const newZoom = Math.max(0.5, Math.min(3, currentZoom * factor));
   
   const translateX = parseFloat(mermaidDiv.getAttribute('data-translate-x')) || 0;
   const translateY = parseFloat(mermaidDiv.getAttribute('data-translate-y')) || 0;
   
   mermaidDiv.setAttribute('data-zoom', newZoom);
   mermaidDiv.style.transform = `translate(${translateX}px, ${translateY}px) scale(${newZoom})`;
   mermaidDiv.style.transformOrigin = 'top left';
   zoomInfo.textContent = Math.round(newZoom * 100) + '%';
   
   console.debug("[portfolio] Zoom changed to:", newZoom);
}

function resetMermaidZoom(button) {
   const container = button.closest('.mermaid-container');
   const mermaidDiv = container.querySelector('.mermaid');
   const zoomInfo = container.querySelector('.mermaid-zoom-info');
   
   mermaidDiv.setAttribute('data-zoom', 1);
   mermaidDiv.setAttribute('data-translate-x', 0);
   mermaidDiv.setAttribute('data-translate-y', 0);
   mermaidDiv.style.transform = 'translate(0, 0) scale(1)';
   mermaidDiv.style.transformOrigin = 'top left';
   zoomInfo.textContent = '100%';
   
   console.debug("[portfolio] Zoom reset to 100%");
}

// Main portfolio initialization
document.addEventListener("DOMContentLoaded", function() {
   console.debug("[portfolio] DOMContentLoaded fired");

   // Store graph definitions for all mermaid diagrams (including pre-wrapped ones)
   const allMermaidDivs = document.querySelectorAll(".mermaid");
   allMermaidDivs.forEach((mermaidDiv) => {
      if (!mermaidDiv.getAttribute('data-graph-definition')) {
         const graphDefinition = mermaidDiv.textContent.trim();
         mermaidDiv.setAttribute('data-graph-definition', graphDefinition);
         console.debug("[portfolio] Stored graph definition for pre-wrapped mermaid diagram");
      }
   });

   // Detect dark theme preference
   const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
   const mermaidTheme = prefersDark ? 'dark' : 'default';
   
   console.debug("[portfolio] Dark theme detected:", prefersDark, "Mermaid theme:", mermaidTheme);
   
   // Initialize Mermaid with theme based on system preference
   mermaid.initialize({ 
      startOnLoad: false,
      theme: mermaidTheme,
      flowchart: {
         useMaxWidth: true,
         htmlLabels: true,
         curve: 'basis'
      },
      themeVariables: prefersDark ? {
         primaryColor: '#4a9eff',
         primaryTextColor: '#ffffff',
         primaryBorderColor: '#4a9eff',
         lineColor: '#4a9eff',
         secondaryColor: '#1e1e1e',
         tertiaryColor: '#2d2d2d',
         background: '#1e1e1e',
         mainBkg: '#1e1e1e',
         secondBkg: '#2d2d2d',
         textColor: '#ffffff',
         edgeLabelBackground: '#2d2d2d',
         clusterBkg: '#2d2d2d',
         clusterBorder: '#4a9eff',
         defaultLinkColor: '#4a9eff',
         titleColor: '#ffffff',
         actorBorder: '#4a9eff',
         actorBkg: '#1e1e1e',
         actorTextColor: '#ffffff',
         actorLineColor: '#4a9eff',
         signalColor: '#4a9eff',
         signalTextColor: '#ffffff',
         labelBoxBkgColor: '#1e1e1e',
         labelBoxBorderColor: '#4a9eff',
         labelTextColor: '#ffffff',
         loopTextColor: '#ffffff',
         noteBorderColor: '#4a9eff',
         noteBkgColor: '#2d2d2d',
         noteTextColor: '#ffffff',
         activationBorderColor: '#4a9eff',
         activationBkgColor: '#2d2d2d',
         sequenceNumberColor: '#ffffff',
         sectionBkgColor: '#2d2d2d',
         altBkgColor: '#1e1e1e',
         altBkgColor2: '#2d2d2d',
         sectionBorderColor: '#4a9eff',
         sectionBkgColor2: '#1e1e1e',
         excludeBkgColor: '#1e1e1e',
         taskBorderColor: '#4a9eff',
         taskBkgColor: '#2d2d2d',
         taskTextLightColor: '#ffffff',
         taskTextColor: '#ffffff',
         taskTextDarkColor: '#ffffff',
         taskTextOutsideColor: '#ffffff',
         taskTextClickableColor: '#4a9eff',
         activeTaskBorderColor: '#4a9eff',
         activeTaskBkgColor: '#2d2d2d',
         gridColor: '#4a9eff',
         doneTaskBkgColor: '#1e1e1e',
         doneTaskBorderColor: '#4a9eff',
         critBorderColor: '#ff6b6b',
         critBkgColor: '#2d2d2d',
         taskTextLightColor: '#ffffff',
         todayLineColor: '#4a9eff',
         labelColor: '#ffffff'
      } : {}
   });
   console.debug("[portfolio] Mermaid initialized with theme:", mermaidTheme);
   
   // Listen for theme changes
   if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
         const newTheme = e.matches ? 'dark' : 'default';
         console.debug("[portfolio] Theme changed to:", newTheme);
         mermaid.initialize({ 
            startOnLoad: false,
            theme: newTheme,
            flowchart: {
               useMaxWidth: true,
               htmlLabels: true,
               curve: 'basis'
            },
            themeVariables: e.matches ? {
               primaryColor: '#4a9eff',
               primaryTextColor: '#ffffff',
               primaryBorderColor: '#4a9eff',
               lineColor: '#4a9eff',
               secondaryColor: '#1e1e1e',
               tertiaryColor: '#2d2d2d',
               background: '#1e1e1e',
               mainBkg: '#1e1e1e',
               secondBkg: '#2d2d2d',
               textColor: '#ffffff',
               edgeLabelBackground: '#2d2d2d',
               clusterBkg: '#2d2d2d',
               clusterBorder: '#4a9eff',
               defaultLinkColor: '#4a9eff',
               titleColor: '#ffffff',
               actorBorder: '#4a9eff',
               actorBkg: '#1e1e1e',
               actorTextColor: '#ffffff',
               actorLineColor: '#4a9eff',
               signalColor: '#4a9eff',
               signalTextColor: '#ffffff',
               labelBoxBkgColor: '#1e1e1e',
               labelBoxBorderColor: '#4a9eff',
               labelTextColor: '#ffffff',
               loopTextColor: '#ffffff',
               noteBorderColor: '#4a9eff',
               noteBkgColor: '#2d2d2d',
               noteTextColor: '#ffffff',
               activationBorderColor: '#4a9eff',
               activationBkgColor: '#2d2d2d',
               sequenceNumberColor: '#ffffff',
               sectionBkgColor: '#2d2d2d',
               altBkgColor: '#1e1e1e',
               altBkgColor2: '#2d2d2d',
               sectionBorderColor: '#4a9eff',
               sectionBkgColor2: '#1e1e1e',
               excludeBkgColor: '#1e1e1e',
               taskBorderColor: '#4a9eff',
               taskBkgColor: '#2d2d2d',
               taskTextLightColor: '#ffffff',
               taskTextColor: '#ffffff',
               taskTextDarkColor: '#ffffff',
               taskTextOutsideColor: '#ffffff',
               taskTextClickableColor: '#4a9eff',
               activeTaskBorderColor: '#4a9eff',
               activeTaskBkgColor: '#2d2d2d',
               gridColor: '#4a9eff',
               doneTaskBkgColor: '#1e1e1e',
               doneTaskBorderColor: '#4a9eff',
               critBorderColor: '#ff6b6b',
               critBkgColor: '#2d2d2d',
               taskTextLightColor: '#ffffff',
               todayLineColor: '#4a9eff',
               labelColor: '#ffffff'
            } : {}
         });
         
         // Re-render all visible mermaid diagrams
         const visibleMermaidDivs = document.querySelectorAll('.flow-diagram-content.active .mermaid');
         if (visibleMermaidDivs.length > 0) {
            visibleMermaidDivs.forEach((div, index) => {
               const graphDefinition = div.getAttribute('data-graph-definition');
               if (graphDefinition) {
                  // Restore original text content for re-rendering
                  div.textContent = graphDefinition;
                  const id = 'mermaid-' + Date.now() + '-' + index;
                  div.id = id;
                  
                  // Re-initialize zoom attributes
                  div.setAttribute('data-zoom', '1');
                  div.setAttribute('data-translate-x', '0');
                  div.setAttribute('data-translate-y', '0');
                  div.style.transform = 'translate(0, 0) scale(1)';
                  div.style.transformOrigin = 'top left';
                  
                  // Update zoom info
                  const container = div.closest('.mermaid-container');
                  if (container) {
                     const zoomInfo = container.querySelector('.mermaid-zoom-info');
                     if (zoomInfo) {
                        zoomInfo.textContent = '100%';
                     }
                  }
                  
                  mermaid.render(id, graphDefinition).then((result) => {
                     div.innerHTML = result.svg;
                     div.setAttribute('data-zoom', '1');
                     div.setAttribute('data-translate-x', '0');
                     div.setAttribute('data-translate-y', '0');
                     div.style.transform = 'translate(0, 0) scale(1)';
                     div.style.transformOrigin = 'top left';
                     console.debug("[portfolio] Mermaid diagram re-rendered with new theme");
                  }).catch((err) => {
                     console.error("[portfolio] Error re-rendering mermaid diagram:", err);
                  });
               }
            });
         }
      });
   }

   // Handle flow diagram toggles
   const toggles = document.querySelectorAll(".flow-diagram-toggle");
   console.debug("[portfolio] Found", toggles.length, "flow diagram toggles");

   toggles.forEach(toggle => {
      toggle.addEventListener("click", function() {
         console.debug("[portfolio] Flow diagram toggle clicked");
         
         const content = this.nextElementSibling;
         const isActive = content.classList.contains("active");
         
         if (isActive) {
            // Close diagram
            content.classList.remove("active");
            this.classList.remove("active");
            console.debug("[portfolio] Diagram closed");
         } else {
            // Open diagram
            content.classList.add("active");
            this.classList.add("active");
            console.debug("[portfolio] Diagram opened");
            
            // Initialize Mermaid diagrams in this content
            const mermaidDivs = content.querySelectorAll(".mermaid");
            console.debug("[portfolio] Found", mermaidDivs.length, "mermaid divs to render");
            
            if (mermaidDivs.length > 0) {
               // Wrap mermaid divs that don't have container yet (before mermaid.init)
               mermaidDivs.forEach((mermaidDiv, index) => {
                  // Store original graph definition before rendering
                  if (!mermaidDiv.getAttribute('data-graph-definition')) {
                     const graphDefinition = mermaidDiv.textContent.trim();
                     mermaidDiv.setAttribute('data-graph-definition', graphDefinition);
                     console.debug("[portfolio] Stored graph definition for mermaid diagram", index);
                  }
                  
                  if (!mermaidDiv.closest('.mermaid-container')) {
                     const container = document.createElement('div');
                     container.className = 'mermaid-container';
                     
                     const scrollContainer = document.createElement('div');
                     scrollContainer.className = 'mermaid-scroll-container';
                     
                     const wrapper = document.createElement('div');
                     wrapper.className = 'mermaid-wrapper';
                     
                     const zoomControls = document.createElement('div');
                     zoomControls.className = 'mermaid-zoom-controls';
                     const uniqueId = Date.now() + index;
                     zoomControls.innerHTML = `
                        <button class="mermaid-zoom-btn" onclick="zoomMermaid(this, 1.2)" title="Zoom In">
                           <i class="fa-solid fa-plus"></i>
                        </button>
                        <button class="mermaid-zoom-btn" onclick="zoomMermaid(this, 0.8)" title="Zoom Out">
                           <i class="fa-solid fa-minus"></i>
                        </button>
                        <button class="mermaid-zoom-btn" onclick="resetMermaidZoom(this)" title="Reset Zoom">
                           <i class="fa-solid fa-rotate-right"></i>
                        </button>
                        <div class="mermaid-zoom-info" id="zoom-info-${uniqueId}">100%</div>
                     `;
                     
                     mermaidDiv.setAttribute('data-zoom', '1');
                     mermaidDiv.setAttribute('data-translate-x', '0');
                     mermaidDiv.setAttribute('data-translate-y', '0');
                     mermaidDiv.setAttribute('data-index', uniqueId.toString());
                     mermaidDiv.style.transform = 'translate(0, 0) scale(1)';
                     mermaidDiv.style.transformOrigin = 'top left';
                     
                     const parent = mermaidDiv.parentNode;
                     parent.insertBefore(container, mermaidDiv);
                     container.appendChild(zoomControls);
                     container.appendChild(scrollContainer);
                     scrollContainer.appendChild(wrapper);
                     wrapper.appendChild(mermaidDiv);
                  }
               });
               
               // Now initialize mermaid after wrapping
               const wrappedMermaidDivs = content.querySelectorAll(".mermaid");
               mermaid.init(undefined, wrappedMermaidDivs);
               console.debug("[portfolio] Mermaid diagrams initialized");
            }
         }
      });
   });

   // Get all tabs and sections
   const tabs = document.querySelectorAll("#cases nav a.case-tab");
   const sections = document.querySelectorAll(".case-section");

   // Map inner anchors to their parent tab IDs
   const anchorToTabMap = {
      "smart-doc-notifier-agent": "reminders",
      "seo-task-creator-agent": "management",
      "postman-tests-generator-agent": "testing",
      "cost-tracker-agent": "finance",
      "content-creator-agent": "content",
      "progress-reporter-agent": "tools",
      "bug-creator-agent": "tools",
      "government-data-parser": "parsers"
   };

   // Function to switch tabs
   function switchTab(tabId) {
      console.debug("[portfolio] switchTab called with:", tabId);

      // Hide all sections
      sections.forEach(section => {
         section.classList.remove("active");
      });

      // Show active section
      const activeSection = document.querySelector(`.case-section[data-section="${tabId}"]`);
      if (activeSection) {
         activeSection.classList.add("active");
      }

      // Update active tab
      tabs.forEach(tab => {
         tab.classList.remove("active");
         if (tab.getAttribute("data-tab") === tabId) {
            tab.classList.add("active");
         }
      });
   }

   function handleHashChange(rawHash) {
      const hash = rawHash.replace("#", "");
      console.debug("[portfolio] handleHashChange hash:", hash);

      const tabIds = ["reminders", "management", "testing", "finance", "content", "tools", "parsers"];

      if (hash && tabIds.includes(hash)) {
         // Hash is a tab id
         switchTab(hash);
      } else if (hash && anchorToTabMap[hash]) {
         // Hash is an inner anchor – open parent tab first
         const parentTabId = anchorToTabMap[hash];
         switchTab(parentTabId);

         // Scroll to the anchor after the tab is visible
         setTimeout(() => {
            const target = document.getElementById(hash);
            if (target) {
               target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
         }, 0);
      } else if (!hash) {
         switchTab("reminders");
      }
   }

   // Add event handlers for tabs
   tabs.forEach(tab => {
      tab.addEventListener("click", function(e) {
         e.preventDefault();
         const tabId = this.getAttribute("data-tab");
         console.debug("[portfolio] tab click:", tabId);
         switchTab(tabId);

         // Update URL without page reload
         window.history.pushState(null, null, `#${tabId}`);
      });
   });

   // Initial load – handle hash (tab or inner anchor)
   handleHashChange(window.location.hash);

   // Handle hash change in URL (e.g., links like #progress-reporter-agent)
   window.addEventListener("hashchange", function() {
      handleHashChange(window.location.hash);
   });
});

// Drag functionality for Mermaid diagrams
document.addEventListener('DOMContentLoaded', function() {
   let isDragging = false;
   let startX, startY;
   let currentTranslateX = 0;
   let currentTranslateY = 0;
   let currentMermaidDiv = null;
   let dragThreshold = 5; // Threshold for detecting drag vs scroll
   let hasMoved = false;
   
   function getEventCoordinates(e) {
      if (e.touches && e.touches.length > 0) {
         return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
   }
   
   function handleStart(e) {
      const mermaidDiv = e.target.closest('.mermaid');
      if (!mermaidDiv || e.target.closest('.mermaid-zoom-controls')) return;
      
      // Only start dragging on left mouse button for mouse events
      if (e.button !== undefined && e.button !== 0) return;
      
      isDragging = true;
      currentMermaidDiv = mermaidDiv;
      const coords = getEventCoordinates(e);
      startX = coords.x;
      startY = coords.y;
      hasMoved = false;
      
      currentTranslateX = parseFloat(mermaidDiv.getAttribute('data-translate-x')) || 0;
      currentTranslateY = parseFloat(mermaidDiv.getAttribute('data-translate-y')) || 0;
      
      mermaidDiv.style.cursor = 'grabbing';
      mermaidDiv.style.transition = 'none';
      
      // Don't prevent default to allow scroll
   }
   
   function handleMove(e) {
      if (!isDragging || !currentMermaidDiv) return;
      
      const coords = getEventCoordinates(e);
      const deltaX = coords.x - startX;
      const deltaY = coords.y - startY;
      
      // Check if movement exceeds threshold
      if (Math.abs(deltaX) > dragThreshold || Math.abs(deltaY) > dragThreshold) {
         hasMoved = true;
      }
      
      // Only prevent default and drag if movement exceeds threshold
      if (hasMoved) {
         e.preventDefault();
         
         const newTranslateX = currentTranslateX + deltaX;
         const newTranslateY = currentTranslateY + deltaY;
         
         const zoom = parseFloat(currentMermaidDiv.getAttribute('data-zoom')) || 1;
         
         currentMermaidDiv.setAttribute('data-translate-x', newTranslateX);
         currentMermaidDiv.setAttribute('data-translate-y', newTranslateY);
         currentMermaidDiv.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px) scale(${zoom})`;
      }
   }
   
   function handleEnd(e) {
      if (!isDragging || !currentMermaidDiv) return;
      
      isDragging = false;
      currentMermaidDiv.style.cursor = 'grab';
      currentMermaidDiv.style.transition = 'transform 0.3s ease';
      currentMermaidDiv = null;
      hasMoved = false;
   }
   
   // Mouse events
   document.addEventListener('mousedown', handleStart);
   document.addEventListener('mousemove', handleMove);
   document.addEventListener('mouseup', handleEnd);
   document.addEventListener('mouseleave', handleEnd);
   
   // Touch events for mobile
   document.addEventListener('touchstart', handleStart, { passive: true });
   document.addEventListener('touchmove', handleMove, { passive: false });
   document.addEventListener('touchend', handleEnd);
   document.addEventListener('touchcancel', handleEnd);
});

