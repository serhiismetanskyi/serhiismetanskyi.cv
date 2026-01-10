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

   // Initialize Mermaid
   mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      flowchart: {
         useMaxWidth: true,
         htmlLabels: true,
         curve: 'basis'
      }
   });
   console.debug("[portfolio] Mermaid initialized");

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

