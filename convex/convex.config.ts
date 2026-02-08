import { defineApp } from "convex/server";
import aggregate from "@convex-dev/aggregate/convex.config";
import migrations from "@convex-dev/migrations/convex.config";
import workflow from "@convex-dev/workflow/convex.config";

const app = defineApp();
app.use(workflow);
app.use(migrations);
app.use(aggregate, { name: "itemAggregate" });
app.use(aggregate, { name: "usageByCompany" });

export default app;
