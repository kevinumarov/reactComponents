// Sample data for Tangled Tree visualizations
export const surveyResponseTreeData = {
  name: "Survey Responses",
  children: [
    {
      name: "Demographics",
      children: [
        {
          name: "Age Groups",
          children: [
            { name: "18-25", value: 120, satisfaction: "high" },
            { name: "26-35", value: 200, satisfaction: "medium" },
            { name: "36-45", value: 150, satisfaction: "high" },
            { name: "46-55", value: 100, satisfaction: "low" },
            { name: "55+", value: 80, satisfaction: "medium" }
          ]
        },
        {
          name: "Location",
          children: [
            { name: "Urban", value: 300, satisfaction: "high" },
            { name: "Suburban", value: 200, satisfaction: "medium" },
            { name: "Rural", value: 150, satisfaction: "medium" }
          ]
        }
      ]
    },
    {
      name: "Product Usage",
      children: [
        {
          name: "Frequency",
          children: [
            { name: "Daily", value: 180, satisfaction: "high" },
            { name: "Weekly", value: 220, satisfaction: "high" },
            { name: "Monthly", value: 150, satisfaction: "medium" },
            { name: "Rarely", value: 100, satisfaction: "low" }
          ]
        },
        {
          name: "Features Used",
          children: [
            { name: "Basic Features", value: 400, satisfaction: "medium" },
            { name: "Advanced Features", value: 200, satisfaction: "high" },
            { name: "Premium Features", value: 50, satisfaction: "high" }
          ]
        }
      ]
    },
    {
      name: "Satisfaction Levels",
      children: [
        {
          name: "Overall Rating",
          children: [
            { name: "Excellent", value: 150, satisfaction: "high" },
            { name: "Good", value: 250, satisfaction: "high" },
            { name: "Average", value: 180, satisfaction: "medium" },
            { name: "Poor", value: 70, satisfaction: "low" }
          ]
        },
        {
          name: "Recommendation",
          children: [
            { name: "Highly Likely", value: 200, satisfaction: "high" },
            { name: "Likely", value: 180, satisfaction: "medium" },
            { name: "Neutral", value: 150, satisfaction: "medium" },
            { name: "Unlikely", value: 120, satisfaction: "low" }
          ]
        }
      ]
    }
  ]
}

export const customerJourneyTreeData = {
  name: "Customer Journey",
  children: [
    {
      name: "Awareness Stage",
      children: [
        {
          name: "Marketing Channels",
          children: [
            { name: "Social Media", value: 300, satisfaction: "high" },
            { name: "Search Ads", value: 250, satisfaction: "medium" },
            { name: "Word of Mouth", value: 200, satisfaction: "high" },
            { name: "Email Campaign", value: 150, satisfaction: "medium" }
          ]
        },
        {
          name: "Content Engagement",
          children: [
            { name: "Blog Posts", value: 180, satisfaction: "medium" },
            { name: "Videos", value: 220, satisfaction: "high" },
            { name: "Webinars", value: 100, satisfaction: "high" },
            { name: "Case Studies", value: 80, satisfaction: "medium" }
          ]
        }
      ]
    },
    {
      name: "Consideration Stage",
      children: [
        {
          name: "Research Activities",
          children: [
            { name: "Product Comparison", value: 200, satisfaction: "medium" },
            { name: "Reviews Reading", value: 250, satisfaction: "high" },
            { name: "Demo Requests", value: 120, satisfaction: "high" },
            { name: "Pricing Research", value: 180, satisfaction: "medium" }
          ]
        },
        {
          name: "Touchpoints",
          children: [
            { name: "Website Visit", value: 400, satisfaction: "medium" },
            { name: "Sales Call", value: 150, satisfaction: "high" },
            { name: "Live Chat", value: 100, satisfaction: "high" },
            { name: "Support Ticket", value: 50, satisfaction: "low" }
          ]
        }
      ]
    },
    {
      name: "Decision Stage",
      children: [
        {
          name: "Purchase Factors",
          children: [
            { name: "Price", value: 300, satisfaction: "medium" },
            { name: "Features", value: 250, satisfaction: "high" },
            { name: "Support Quality", value: 200, satisfaction: "high" },
            { name: "Brand Trust", value: 180, satisfaction: "high" }
          ]
        },
        {
          name: "Final Actions",
          children: [
            { name: "Purchase", value: 200, satisfaction: "high" },
            { name: "Trial Signup", value: 150, satisfaction: "medium" },
            { name: "Newsletter Subscribe", value: 100, satisfaction: "medium" },
            { name: "Abandoned Cart", value: 80, satisfaction: "low" }
          ]
        }
      ]
    }
  ]
}
