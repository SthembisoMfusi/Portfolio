// GitHub API Configuration
const GITHUB_USERNAME = 'SthembisoMfusi';
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch(GITHUB_API, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();
        

        

        const sortedRepos = repos.sort((a, b) => {
            // Primary sort by stars
            if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
            }
            // Secondary sort by update date
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

        return sortedRepos;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        return [];
    }
}

// Update featured projects with live data
async function updateFeaturedProjects() {
    const featuredCards = document.querySelectorAll('.project-card.highlighted');
    
    for (const card of featuredCards) {
        const repoFullName = card.getAttribute('data-repo');
        if (repoFullName) {
            try {
                const response = await fetch(`https://api.github.com/repos/${repoFullName}`, {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                
                if (response.ok) {
                    const repoData = await response.json();
                    
                    // Update stars
                    const starCount = card.querySelector('.star-count');
                    if (starCount) {
                        starCount.textContent = repoData.stargazers_count;
                    }
                    
                    // Update language tag
                    const languageTag = card.querySelector('.language-tag');
                    if (languageTag && repoData.language) {
                        languageTag.textContent = repoData.language;
                        languageTag.style.background = getLanguageColor(repoData.language);
                    }
                }
            } catch (error) {
                console.error(`Error updating featured project ${repoFullName}:`, error);
            }
        }
    }
}

// Create project card HTML
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card github-project';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    const languageColor = getLanguageColor(repo.language);
    
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="project-header">
            <h3>${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
            ${repo.fork ? '<span class="badge fork-badge">Fork</span>' : ''}
        </div>
        <p class="project-description">${repo.description || 'No description available'}</p>
        <div class="project-meta">
            ${repo.language ? `<span class="language-tag" style="background: ${languageColor}">${repo.language}</span>` : ''}
            <span class="stars"><i class="fa fa-star"></i> ${repo.stargazers_count}</span>
            <span class="forks"><i class="fa fa-code-branch"></i> ${repo.forks_count}</span>
        </div>
        <div class="project-footer">
            <span class="updated-date"><i class="fa fa-clock"></i> Updated ${updatedDate}</span>
            <a href="${repo.html_url}" target="_blank" class="project-link">
                <i class="fab fa-github"></i> View Code
            </a>
        </div>
    `;
    
    return card;
}

// Get language-specific colors
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Python': '#3572A5',
        'Java': '#b07219',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'C++': '#f34b7d',
        'C': '#555555',
        'Go': '#00ADD8',
        'Ruby': '#701516',
        'PHP': '#4F5D95',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Rust': '#dea584',
        'Shell': '#89e051',
        'Vue': '#41b883',
        'React': '#61dafb',
        'Jupyter Notebook': '#DA5B0B'
    };
    
    return colors[language] || '#858585';
}

// Calculate total statistics
function calculateStats(repos) {
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
    
    return {
        totalRepos: repos.length,
        totalStars,
        totalForks
    };
}

// Animate number counting
function animateNumber(element, target, duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Display GitHub projects
async function displayGitHubProjects() {
    const container = document.getElementById('github-projects-container');
    const repos = await fetchGitHubRepos();
    
    if (repos.length === 0) {
        container.innerHTML = `
            <div class="error-message">
                <i class="fa fa-exclamation-circle"></i>
                <p>Unable to load repositories. Please try again later.</p>
            </div>
        `;
        return;
    }
    
    // Update statistics
    const stats = calculateStats(repos);
    animateNumber(document.getElementById('total-repos'), stats.totalRepos);
    animateNumber(document.getElementById('total-stars'), stats.totalStars);
    animateNumber(document.getElementById('total-forks'), stats.totalForks);
    
    // Clear loading spinner
    container.innerHTML = '';
    
    // Display repositories (limit to first 12 for better UX)
    const displayRepos = repos.slice(0, 12);
    
    displayRepos.forEach((repo, index) => {
        const card = createProjectCard(repo);
        container.appendChild(card);
        
        // Animate cards in sequence
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add "Show More" button if there are more repos
    if (repos.length > 12) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more-btn';
        showMoreBtn.innerHTML = `<i class="fa fa-chevron-down"></i> Show More (${repos.length - 12} more)`;
        showMoreBtn.onclick = () => {
            const remainingRepos = repos.slice(12);
            const currentIndex = container.children.length;
            
            remainingRepos.forEach((repo, index) => {
                const card = createProjectCard(repo);
                container.appendChild(card);
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            });
            
            showMoreBtn.remove();
        };
        
        container.parentElement.insertBefore(showMoreBtn, container.nextSibling);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Update featured projects with live data
    updateFeaturedProjects();
    
    // Display all GitHub projects
    displayGitHubProjects();
});

// Add refresh functionality
function addRefreshButton() {
    const section = document.getElementById('github-projects');
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'refresh-btn';
    refreshBtn.innerHTML = '<i class="fa fa-sync-alt"></i> Refresh';
    refreshBtn.onclick = async () => {
        refreshBtn.classList.add('spinning');
        await displayGitHubProjects();
        setTimeout(() => refreshBtn.classList.remove('spinning'), 1000);
    };
    
    const heading = section.querySelector('h2');
    heading.appendChild(refreshBtn);
}

// Call after DOM is loaded
document.addEventListener('DOMContentLoaded', addRefreshButton);

