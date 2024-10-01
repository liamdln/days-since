package main

import (
	"context"
	"encoding/json"
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

func (a *App) GetAllBoards() (string, error) {

	content, err := os.ReadFile("./boards.json")
	if err != nil {
		return "", err
	}

	contentStr := string(content[:])

	return contentStr, nil

}

func (a *App) WriteBoard(boards []Board) (bool, error) {

	// inBoards, err := a.GetAllBoards()
	// if err != nil {
	// 	return false, err
	// }

	// newBoards := []Board{}
	// err = json.Unmarshal([]byte(inBoards), &newBoards)
	// if err != nil {
	// 	return false, err
	// }

	// newBoards = append(newBoards, board)

	newBoards, err := json.Marshal(boards)
	if err != nil {
		return false, err
	}

	err = os.WriteFile("./boards.json", newBoards, 0644)
	if err != nil {
		return false, err
	}

	return true, nil
}
