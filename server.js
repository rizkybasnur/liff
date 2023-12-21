const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/api/saveData", (req, res) => {
  try {
    const filePath = path.join(__dirname, "src/data/data.json");
    const existingData = fs.existsSync(filePath) ? readJsonFile(filePath) : [];
    const newData = req.body;
    newData.id = existingData.length + 1;
    existingData.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    res.json({ message: "Data saved successfully", id: newData.id });
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/getAllData", (req, res) => {
  try {
    const filePath = path.join(__dirname, "src/data/data.json");
    const allData = readJsonFile(filePath);
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 8;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const paginatedData = allData.slice(startIndex, endIndex);
    res.json({
      totalItems: allData.length,
      totalPages: Math.ceil(allData.length / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: paginatedData,
    });
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/searchMovies", (req, res) => {
  try {
    const filePath = path.join(__dirname, "src/data/data.json");
    const allMovies = readJsonFile(filePath);
    const titleQuery = req.body.title;
    const descriptionQuery = req.body.description;
    const artistsQuery = req.body.artists;
    const genreQuery = req.body.genre;

    const filteredMovies = allMovies.filter((movie) => {
      const titleMatch = titleQuery
        ? movie.title.toLowerCase().includes(titleQuery.toLowerCase())
        : true;
      const descriptionMatch = descriptionQuery
        ? movie.description
            .toLowerCase()
            .includes(descriptionQuery.toLowerCase())
        : true;
      const artistsMatch = artistsQuery
        ? movie.artists.some((artist) =>
            artist.toLowerCase().includes(artistsQuery.toLowerCase())
          )
        : true;
      const genreMatch = genreQuery
        ? movie.genres.some(
            (genre) => genre.toLowerCase() === genreQuery.toLowerCase()
          )
        : true;
      return titleMatch && descriptionMatch && artistsMatch && genreMatch;
    });
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

    res.json({
      totalMovies: filteredMovies.length,
      totalPages: Math.ceil(filteredMovies.length / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: paginatedMovies,
    });
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/mostViewedMovies", (req, res) => {
  try {
    const filePath = path.join(__dirname, "src/data/data.json");
    const allMovies = readJsonFile(filePath);
    const sortedMovies = allMovies.sort((a, b) => b.views - a.views);
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 8;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const paginatedMovies = sortedMovies.slice(startIndex, endIndex);
    res.json({
      totalMovies: sortedMovies.length,
      totalPages: Math.ceil(sortedMovies.length / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: paginatedMovies,
    });
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/views", (req, res) => {
  try {
    const filePath = path.join(__dirname, "src/data/data.json");
    const allMovies = readJsonFile(filePath);
    let title = [];
    let views = [];
    allMovies.forEach((e) => {
      title.push(e.title);
      views.push(e.views);
    });

    res.json({
      title,
      views,
    });
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/sortedMovies", (req, res) => {
  try {
    const filePath = path.join(__dirname, "src/data/data.json");
    const allMovies = readJsonFile(filePath);
    let sortedMovies = allMovies.sort((a, b) => b.views - a.views);
    const genreToFilter = req.body.genre;
    let result = [];
    result = sortedMovies.filter((movie) =>
      movie.genres.includes(genreToFilter)
    );
    const page = parseInt(req.body.page) || 1;
    const pageSize = parseInt(req.body.pageSize) || 8;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const paginatedMovies = result.slice(startIndex, endIndex);
    res.json({
      totalMovies: result.length,
      totalPages: Math.ceil(result.length / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: paginatedMovies,
    });
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/updateData", (req, res) => {
  try {
    const filePath = path.join(__dirname, "src/data/data.json");
    const idToUpdate = parseInt(req.body.id);
    const newData = req.body;
    const existingData = fs.existsSync(filePath) ? readJsonFile(filePath) : [];
    const dataIndex = existingData.findIndex((item) => item.id === idToUpdate);
    if (dataIndex === -1) {
      res.status(404).json({ error: "Data not found" });
    } else {
      existingData[dataIndex] = { ...existingData[dataIndex], ...newData };
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
      res.json({
        message: "Data updated successfully",
        updatedData: existingData[dataIndex],
      });
    }
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/updateViews", (req, res) => {
  try {
    const filePath = path.join(__dirname, "src/data/data.json");
    const allMovies = readJsonFile(filePath);
    const movieId = parseInt(req.body.id);
    const foundMovie = allMovies.find((movie) => movie.id === movieId);
    if (foundMovie) {
      foundMovie.views += 1;
      writeJsonFile(filePath, allMovies);
      res.json({
        message: "Views updated successfully",
        updatedMovie: foundMovie,
      });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/login", (req, res) => {
  try {
    const filePath = path.join(__dirname, "src/data/user.json");
    const userData = readJsonFile(filePath);

    const { username, password } = req.body;

    const user = userData.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      res.json({
        message: "Login successful",
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function readJsonFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const fileContent = fs.readFileSync(filePath, "utf-8");
    if (!fileContent.trim()) {
      return [];
    }
    try {
      return JSON.parse(fileContent);
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      return [];
    }
  } catch (fileReadError) {
    console.error("Error reading JSON file:", fileReadError);
    return [];
  }
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to JSON file:", error);
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
