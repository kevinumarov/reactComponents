// Sample data for Indented Tree visualizations - Perfect for hierarchical survey analysis
export const surveyHierarchyData = {
  name: "Customer Satisfaction Survey",
  value: 1250,
  children: [
    {
      name: "Product Experience",
      value: 450,
      children: [
        {
          name: "Quality Assessment",
          value: 200,
          children: [
            { name: "Excellent", value: 85 },
            { name: "Good", value: 75 },
            { name: "Average", value: 30 },
            { name: "Poor", value: 10 }
          ]
        },
        {
          name: "Feature Satisfaction",
          value: 150,
          children: [
            { name: "Core Features", value: 90 },
            { name: "Advanced Features", value: 40 },
            { name: "Premium Features", value: 20 }
          ]
        },
        {
          name: "Usability",
          value: 100,
          children: [
            { name: "Very Easy", value: 45 },
            { name: "Easy", value: 35 },
            { name: "Moderate", value: 15 },
            { name: "Difficult", value: 5 }
          ]
        }
      ]
    },
    {
      name: "Customer Service",
      value: 350,
      children: [
        {
          name: "Response Time",
          value: 120,
          children: [
            { name: "< 1 hour", value: 50 },
            { name: "1-4 hours", value: 40 },
            { name: "4-24 hours", value: 25 },
            { name: "> 24 hours", value: 5 }
          ]
        },
        {
          name: "Support Quality",
          value: 130,
          children: [
            { name: "Excellent", value: 60 },
            { name: "Good", value: 45 },
            { name: "Average", value: 20 },
            { name: "Poor", value: 5 }
          ]
        },
        {
          name: "Resolution Rate",
          value: 100,
          children: [
            { name: "First Contact", value: 40 },
            { name: "Follow-up Required", value: 35 },
            { name: "Multiple Contacts", value: 20 },
            { name: "Unresolved", value: 5 }
          ]
        }
      ]
    },
    {
      name: "Value Proposition",
      value: 300,
      children: [
        {
          name: "Pricing",
          value: 150,
          children: [
            { name: "Excellent Value", value: 35 },
            { name: "Good Value", value: 55 },
            { name: "Fair Value", value: 45 },
            { name: "Poor Value", value: 15 }
          ]
        },
        {
          name: "Competitive Position",
          value: 100,
          children: [
            { name: "Much Better", value: 25 },
            { name: "Better", value: 40 },
            { name: "Similar", value: 30 },
            { name: "Worse", value: 5 }
          ]
        },
        {
          name: "ROI Perception",
          value: 50,
          children: [
            { name: "High ROI", value: 20 },
            { name: "Moderate ROI", value: 20 },
            { name: "Low ROI", value: 10 }
          ]
        }
      ]
    },
    {
      name: "Future Intent",
      value: 150,
      children: [
        {
          name: "Repurchase Intent",
          value: 80,
          children: [
            { name: "Definitely", value: 30 },
            { name: "Probably", value: 25 },
            { name: "Maybe", value: 20 },
            { name: "Unlikely", value: 5 }
          ]
        },
        {
          name: "Recommendation",
          value: 70,
          children: [
            { name: "Promoters", value: 35 },
            { name: "Passives", value: 25 },
            { name: "Detractors", value: 10 }
          ]
        }
      ]
    }
  ]
}

export const organizationalSurveyData = {
  name: "Employee Engagement Survey",
  value: 850,
  children: [
    {
      name: "Work Environment",
      value: 300,
      children: [
        {
          name: "Physical Workspace",
          value: 100,
          children: [
            { name: "Very Satisfied", value: 40 },
            { name: "Satisfied", value: 35 },
            { name: "Neutral", value: 20 },
            { name: "Dissatisfied", value: 5 }
          ]
        },
        {
          name: "Technology & Tools",
          value: 120,
          children: [
            { name: "Excellent", value: 50 },
            { name: "Good", value: 45 },
            { name: "Adequate", value: 20 },
            { name: "Poor", value: 5 }
          ]
        },
        {
          name: "Safety & Health",
          value: 80,
          children: [
            { name: "Very Safe", value: 45 },
            { name: "Safe", value: 30 },
            { name: "Concerns", value: 5 }
          ]
        }
      ]
    },
    {
      name: "Management & Leadership",
      value: 250,
      children: [
        {
          name: "Direct Supervisor",
          value: 120,
          children: [
            { name: "Excellent", value: 45 },
            { name: "Good", value: 40 },
            { name: "Average", value: 25 },
            { name: "Poor", value: 10 }
          ]
        },
        {
          name: "Senior Leadership",
          value: 80,
          children: [
            { name: "Strong Confidence", value: 25 },
            { name: "Some Confidence", value: 35 },
            { name: "Little Confidence", value: 20 }
          ]
        },
        {
          name: "Communication",
          value: 50,
          children: [
            { name: "Very Clear", value: 20 },
            { name: "Clear", value: 20 },
            { name: "Unclear", value: 10 }
          ]
        }
      ]
    },
    {
      name: "Career Development",
      value: 200,
      children: [
        {
          name: "Growth Opportunities",
          value: 100,
          children: [
            { name: "Many Opportunities", value: 25 },
            { name: "Some Opportunities", value: 45 },
            { name: "Few Opportunities", value: 25 },
            { name: "No Opportunities", value: 5 }
          ]
        },
        {
          name: "Training & Development",
          value: 60,
          children: [
            { name: "Excellent", value: 20 },
            { name: "Good", value: 25 },
            { name: "Adequate", value: 15 }
          ]
        },
        {
          name: "Mentorship",
          value: 40,
          children: [
            { name: "Available", value: 15 },
            { name: "Limited", value: 20 },
            { name: "Not Available", value: 5 }
          ]
        }
      ]
    },
    {
      name: "Compensation & Benefits",
      value: 100,
      children: [
        {
          name: "Salary Satisfaction",
          value: 60,
          children: [
            { name: "Very Satisfied", value: 15 },
            { name: "Satisfied", value: 25 },
            { name: "Dissatisfied", value: 20 }
          ]
        },
        {
          name: "Benefits Package",
          value: 40,
          children: [
            { name: "Excellent", value: 20 },
            { name: "Good", value: 15 },
            { name: "Poor", value: 5 }
          ]
        }
      ]
    }
  ]
}

export const marketResearchTreeData = {
  name: "Brand Perception Study",
  value: 2000,
  children: [
    {
      name: "Brand Awareness",
      value: 600,
      children: [
        {
          name: "Unaided Recall",
          value: 200,
          children: [
            { name: "Top of Mind", value: 80 },
            { name: "Spontaneous", value: 70 },
            { name: "Not Mentioned", value: 50 }
          ]
        },
        {
          name: "Aided Recall",
          value: 250,
          children: [
            { name: "Immediate Recognition", value: 120 },
            { name: "After Prompting", value: 80 },
            { name: "No Recognition", value: 50 }
          ]
        },
        {
          name: "Brand Familiarity",
          value: 150,
          children: [
            { name: "Very Familiar", value: 60 },
            { name: "Somewhat Familiar", value: 70 },
            { name: "Not Familiar", value: 20 }
          ]
        }
      ]
    },
    {
      name: "Brand Attributes",
      value: 800,
      children: [
        {
          name: "Quality Perception",
          value: 300,
          children: [
            { name: "Premium Quality", value: 120 },
            { name: "Good Quality", value: 130 },
            { name: "Average Quality", value: 40 },
            { name: "Poor Quality", value: 10 }
          ]
        },
        {
          name: "Innovation",
          value: 250,
          children: [
            { name: "Very Innovative", value: 100 },
            { name: "Somewhat Innovative", value: 90 },
            { name: "Traditional", value: 60 }
          ]
        },
        {
          name: "Trustworthiness",
          value: 250,
          children: [
            { name: "Highly Trustworthy", value: 110 },
            { name: "Trustworthy", value: 100 },
            { name: "Questionable", value: 40 }
          ]
        }
      ]
    },
    {
      name: "Purchase Behavior",
      value: 400,
      children: [
        {
          name: "Current Usage",
          value: 200,
          children: [
            { name: "Regular User", value: 80 },
            { name: "Occasional User", value: 70 },
            { name: "Former User", value: 30 },
            { name: "Never Used", value: 20 }
          ]
        },
        {
          name: "Purchase Intent",
          value: 200,
          children: [
            { name: "Definitely Will Buy", value: 60 },
            { name: "Probably Will Buy", value: 80 },
            { name: "Might Buy", value: 40 },
            { name: "Will Not Buy", value: 20 }
          ]
        }
      ]
    },
    {
      name: "Competitive Landscape",
      value: 200,
      children: [
        {
          name: "Brand Preference",
          value: 120,
          children: [
            { name: "First Choice", value: 50 },
            { name: "Second Choice", value: 40 },
            { name: "Not Preferred", value: 30 }
          ]
        },
        {
          name: "Switching Likelihood",
          value: 80,
          children: [
            { name: "Very Likely", value: 20 },
            { name: "Somewhat Likely", value: 35 },
            { name: "Unlikely", value: 25 }
          ]
        }
      ]
    }
  ]
}
