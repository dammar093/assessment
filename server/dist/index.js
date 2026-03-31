import app from "./src/app.js";
const PORT = process.env.PORT || 8000;
app
    .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
})
    .on("error", (err) => {
    console.error("Server failed to start:", err);
});
//# sourceMappingURL=index.js.map