import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addData,
  removeData,
  updateData,
} from "../reduxtoolkit/slice/crudSLice";

import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { UNSPLASH_ACCESS_KEY, UNSPLASH_API_URL } from "../hooks/useEnv";

const Todo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.crud.data);
  const [value, setValue] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [backgroundImage, setBackgroundImage] = useState(
    "https://images.pexels.com/photos/27351134/pexels-photo-27351134/free-photo-of-a-boat-by-the-pier.jpeg"
  );

  // Get random image
  // const fetchBackgroundImage = async () => {
  //   try {
  //     const response = await fetch(
  //       `${UNSPLASH_API_URL}?per_page=1&page=${Math.floor(
  //         Math.random() * 100
  //       )}`,
  //       {
  //         headers: {
  //           Authorization: UNSPLASH_ACCESS_KEY,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     const randomImage = data.photos[0];
  //     setBackgroundImage(randomImage.src.original);
  //   } catch (error) {
  //     console.error("Error fetching background image:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchBackgroundImage();

  //   const intervalId = setInterval(() => {
  //     fetchBackgroundImage();
  //   }, 10000);

  //   return () => clearInterval(intervalId);
  // }, []);

  // Add todo to data

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      title: value,
    };
    if (value.trim().length > 0) {
      dispatch(addData(newTodo));
      setValue("");
    } else {
      alert("Please enter a task");
    }
  };

  // Delete todo

  const handleOpenDeleteDialog = (todo) => {
    setSelectedTodo(todo);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    dispatch(removeData(selectedTodo.id));
    setOpenDeleteDialog(false);
  };

  // Edit todo

  const handleOpenEditDialog = (todo) => {
    setSelectedTodo(todo);
    setEditValue(todo.title);
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    dispatch(
      updateData({
        id: selectedTodo.id,
        title: editValue,
      })
    );
    setOpenEditDialog(false);
  };

  // Search todo

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <Box
      sx={{
        background: "black",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 500,
          margin: "auto",
          mt: 4,
          backgroundColor: "transparent",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ color: "white" }}
        >
          Todo List
        </Typography>

        <TextField
          label="Search Todos"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Border color
              },
              "&:hover fieldset": {
                borderColor: "white", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Border color when focused
              },
            },
            "& .MuiInputLabel-root": {
              color: "white", // Label color
            },
            "& .MuiInputBase-input": {
              color: "white", // Input text color
            },
          }}
          autoComplete="off"
        />

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
          autoComplete="off"
        >
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Enter Todo"
            variant="outlined"
            fullWidth
            sx={{
              mr: 2,
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Border color
                },
                "&:hover fieldset": {
                  borderColor: "white", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white", // Border color when focused
                },
              },
              "& .MuiInputLabel-root": {
                color: "white", // Label color
              },
              "& .MuiInputBase-input": {
                color: "white", // Input text color
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 2, mb: 2, background: "transparent", width: "100px" }}
          >
            Add
          </Button>
        </form>

        <List
          sx={{
            width: "100%",
            bgcolor: "transparent",
            height: "350px",
            overflowY: "scroll",
          }}
        >
          {filteredTodos.length > 0 ? (
            filteredTodos.reverse().map((todo, index) => (
              <ListItem
                key={index}
                sx={{
                  color: "white",
                  p: 0,
                  borderBottom: "1px solid #e0e0e0",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                    color: "black",
                  },
                }}
                secondaryAction={
                  <Box>
                    <IconButton
                      aria-label="edit"
                      sx={{
                        color: "primary.main",
                        mr: 1,
                        "&:hover": { color: "primary.dark" },
                      }}
                      onClick={() => handleOpenEditDialog(todo)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      sx={{
                        p:0,
                        color: "error.main",
                        "&:hover": { color: "error.dark" },
                      }}
                      onClick={() => handleOpenDeleteDialog(todo)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={todo.title}
                  sx={{
                    p: 1,
                    color: "white",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                />
              </ListItem>
            ))
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              sx={{ mt: 2, color:"white" }}
            >
              No todos.
            </Typography>
          )}
        </List>

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Delete Todo</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this Todo?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogContent sx={{ width: "400px" }}>
            <TextField
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              fullWidth
              variant="outlined"
              margin="dense"
              label="Todo"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Todo;
