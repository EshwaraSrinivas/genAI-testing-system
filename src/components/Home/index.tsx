import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Container, CircularProgress } from "@mui/material";
import Results from '../Results';
import { Scenario } from '../../models/scenario';

const scenariosData: Scenario[] = [
  {
    feature: "Customer Onboarding",
    scenarios: [
      {
        title: "Successfully create a new customer",
        steps: [
          "Given a valid customer object",
          "When the create customer endpoint is called",
          "Then the customer should be saved in the database with a unique ID",
        ],
      },
      {
        title: "Attempt to create a customer with missing required fields",
        steps: [
          "Given a customer object with missing required fields",
          "When the create customer endpoint is called",
          "Then an error should be thrown stating the missing fields",
        ],
      },
    ],
  },
  {
    feature: "User Authentication",
    scenarios: [
      {
        title: "Login with valid credentials",
        steps: [
          "Given a registered user",
          "When they enter valid credentials",
          "Then they should be logged in successfully",
        ],
      },
      {
        title: "Attempt login with incorrect password",
        steps: [
          "Given a registered user",
          "When they enter an incorrect password",
          "Then they should receive an error message",
        ],
      },
    ],
  },
];


const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
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
    setLoading(true);
    setScenarios([]);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response:", data);
      setScenarios(scenariosData);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container>
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

          <Button
            type="submit"
            variant="contained"
            fullWidth sx={{ backgroundColor: "#d71e28" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Generate"}
          </Button>
        </form>
      </Container>
      {scenarios.length > 0 &&
        <Container>
          <Results scenarios={scenarios} />
        </Container>
      }
    </Container>
  );
};

export default Home;
