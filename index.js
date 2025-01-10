const app = {
    currentView: 'today',
    tasks: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: false },
        { id: 3, title: 'Task 3', completed: false }
    ],
    streak: 6,
    
    init() {
        this.render();
        this.addEventListeners();
    },

    addEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-item')) {
                this.currentView = e.target.dataset.view;
                this.render();
            }
            if (e.target.matches('.back-button')) {
                this.currentView = 'today';
                this.render();
            }
            if (e.target.matches('.add-task')) {
                const title = prompt('Enter task name:');
                if (title) {
                    this.tasks.push({
                        id: Date.now(),
                        title,
                        completed: false
                    });
                    this.render();
                }
            }
        });
    },

    render() {
        const app = document.getElementById('app');
        app.innerHTML = this.getView();
    },

    getView() {
        switch(this.currentView) {
            case 'today':
                return this.getTodayView();
            case 'streak':
                return this.getStreakView();
            case 'progress':
                return this.getProgressView();
            case 'habits':
                return this.getHabitsView();
            default:
                return this.getTodayView();
        }
    },

    getTodayView() {
        return `
            <div class="container">
                <div class="header">
                    <h2>Today Activities</h2>
                    <div class="days">
                        <div class="day">
                            <small>sun</small>
                            <strong>10</strong>
                        </div>
                        <div class="day">
                            <small>mon</small>
                            <strong>11</strong>
                        </div>
                        <div class="day">
                            <small>tue</small>
                            <strong>12</strong>
                        </div>
                        <div class="day">
                            <small>wed</small>
                            <strong>13</strong>
                        </div>
                    </div>
                    <button class="add-task">+ Add tasks</button>
                </div>
                ${this.tasks.map(task => `
                    <div class="task">${task.title}</div>
                `).join('')}
                <div class="streak-container">
                    Streak Rewards 🔥
                </div>
                <div class="navigation">
                    <div class="nav-item" data-view="habits">✓</div>
                    <div class="nav-item" data-view="streak">📱</div>
                    <div class="nav-item" data-view="progress">📊</div>
                </div>
            </div>
        `;
    },

    getStreakView() {
        return `
            <div class="container">
                <h2>Streak</h2>
                <div class="streak-container">
                    <div class="streak-dots">
                        ${Array(7).fill('').map((_, i) => `
                            <div class="dot" style="background: ${i < this.streak ? '#4CAF50' : 'transparent'}"></div>
                        `).join('')}
                    </div>
                </div>
                <h3>Streak Rewards</h3>
                <div class="task">Reward 1</div>
                <div class="task">Reward 2</div>
                <div class="task">Reward 3</div>
                <button class="back-button">Back</button>
            </div>
        `;
    },

    getProgressView() {
        return `
            <div class="container">
                <h2>Your Progress</h2>
                <div class="progress-chart">
                    <!-- Placeholder for chart -->
                </div>
                <div class="progress-item">
                    <span>Task 1</span>
                    <span>40%</span>
                </div>
                <div class="progress-item">
                    <span>Task 2</span>
                    <span>75%</span>
                </div>
                <div class="progress-item">
                    <span>Overall</span>
                    <span>58%</span>
                </div>
                <button class="back-button">Back</button>
            </div>
        `;
    },

    getHabitsView() {
        return `
            <div class="container">
                <h2>Habbits</h2>
                <div class="task">
                    <div>Time:</div>
                    <div>Task</div>
                </div>
                <div class="task">
                    <div>Time:</div>
                    <div>Task</div>
                </div>
                <button class="back-button">Back</button>
            </div>
        `;
    }
};

app.init();