import { useState } from "react";
import { Card, Grid, Tab, TabList, Text, Title } from "@tremor/react";

import CalorieCard from "../components/CalorieCard";
import WeightCard from "../components/WeightCard";
import WaterCard from "../components/WaterCard";
import CalorieDetails from "../components/CalorieDetails";

export default function Home() {
  const [selectedView, setSelectedView] = useState("1");
  return (
    <main className="bg-slate-50 p-6 sm:p-10">
      <Title>Dashboard</Title>
      <Text>Your health dashboard</Text>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setSelectedView(value)}
        className="mt-6"
      >
        <Tab value="1" text="Overview" />
        <Tab value="2" text="Calories" />
        <Tab value="3" text="Water" />
        <Tab value="4" text="Weight" />
      </TabList>

      {selectedView === "1" ? (
        <>
          <Grid numColsLg={2} className="mt-6 gap-6">
            <CalorieCard />
            <WaterCard />
          </Grid>

          <div className="mt-6">
            <WeightCard />
          </div>
        </>
      ) : (
        <CalorieDetails />
      )}
    </main>
  );
}