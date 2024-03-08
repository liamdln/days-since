package main

import (
	"context"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

type Board struct {
	Uuid          string `json:"uuid"`
	Description   string `json:"description"`
	BackgroundUrl string `json:"background_url"`
	Date          string `json:"date"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// // Greet returns a greeting for the given name
// func (a *App) Greet(name string) string {
// 	return fmt.Sprintf("Hello %s, It's show time!", name)
// }

func (a *App) GetAllBoards() (string, error) {

	content, err := os.ReadFile("./boards.json")
	if err != nil {
		return "", err
	}

	contentStr := string(content[:])

	return contentStr, nil

}
