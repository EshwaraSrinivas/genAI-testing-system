import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Container } from "@mui/material";

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    dropdown1: "",
    dropdown2: "",
    inputText: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel>Select AppID</InputLabel>
          <Select name="dropdown1" value={formData.dropdown1} onChange={handleChange} label="Select AppID">
            <MenuItem value="option1">CA10001</MenuItem>
            <MenuItem value="option2">CA10002</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Select Component</InputLabel>
          <Select name="dropdown2" value={formData.dropdown2} onChange={handleChange} label="Select Component">
            <MenuItem value="optionA">CustomerOnboarding</MenuItem>
            <MenuItem value="optionB">CreditCardSystem</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Github url"
          name="inputText"
          value={formData.inputText}
          onChange={handleChange}
          margin="normal"
        />

        <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#d71e28" }}>
          Generate
        </Button>
      </form>
    </Container>
  );
};

export default Home;
