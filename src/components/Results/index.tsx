import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Scenario } from '../../models/scenario';

interface Props {
  scenarios: Scenario[];
}

const Results: React.FC<Props> = ({ scenarios }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Tabs value={tabIndex} onChange={(_, newValue) => setTabIndex(newValue)}>
        <Tab label="Scenarios" />
        <Tab label="Test Cases" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabIndex === 0 && (
          <Box>
            {scenarios.map((item, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{item.feature}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {item.scenarios.map((scenario, i) => (
                    <Box key={i} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {scenario.title}
                      </Typography>
                      <List>
                        {scenario.steps.map((step, j) => (
                          <ListItem key={j}>{step}</ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
        {tabIndex === 1 && (
          <Typography variant="body1">Test cases will be listed here...</Typography>
        )}
      </Box>
    </Box>
  );
};

Results.defaultProps = {
  scenarios: [],
};

export default Results;
