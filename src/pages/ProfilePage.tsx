import { useState, useEffect } from "react";
import { Plus, Trash2, Save, ChevronDown, ChevronUp, Camera } from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    headline: "",
    location: "",
    phone: "",
    avatar: null as File | null,
    about: "",
    experience: [] as { company: string; role: string; location: string }[],
    education: [] as any[],
    projects: [] as any[],
    skills: [] as string[],
    languages: [] as any[],
    interests: [] as string[],
    social: { linkedin: "", github: "", portfolio: "" },
  });

  const [collapsed, setCollapsed] = useState({
    about: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
    languages: true,
    interests: true,
    social: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<null | {
    title: string;
    description: string;
    type: "success" | "error";
  }>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const showToast = (
    title: string,
    description: string,
    type: "success" | "error" = "success"
  ) => {
    setNotification({ title, description, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const res = await fetch("http://127.0.0.1:8000/api/auth/profile/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setProfile((prev) => ({
          ...prev,
          firstName: data.profile.first_name || prev.firstName,
          lastName: data.profile.last_name || prev.lastName,
          email: data.profile.email || prev.email,
          headline: data.profile.headline || prev.headline,
          location: data.profile.location || prev.location,
          phone: data.profile.phone || prev.phone,
          avatar: null,
          about: data.profile.bio || prev.about,
          experience: data.profile.experience || prev.experience,
          education: data.profile.education || prev.education,
          projects: data.profile.projects || prev.projects,
          skills: data.profile.skills || prev.skills,
          languages: data.profile.languages || prev.languages,
          interests: data.profile.interests || prev.interests,
          social: {
            linkedin: data.profile.linkedin_url || prev.social.linkedin,
            github: data.profile.github_url || prev.social.github,
            portfolio: data.profile.portfolio_url || prev.social.portfolio,
          },
        }));
      } else {
        throw new Error("Failed to load profile");
      }
    } catch (err) {
      console.error(err);
      showToast("Error loading profile", "Using cached or empty data", "error");
    }
  };

  const saveProfile = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("User not authenticated");

      let res;
      if (profile.avatar) {
        const formData = new FormData();
        Object.entries(profile).forEach(([key, value]) => {
          if (key === "avatar" && value) formData.append("avatar", value as File);
          else if (
            ["experience", "education", "projects", "skills", "languages", "interests"].includes(
              key
            )
          )
            formData.append(key, JSON.stringify(value));
          else if (key === "social") formData.append(key, JSON.stringify(value));
          else formData.append(key, value as string);
        });

        res = await fetch("http://127.0.0.1:8000/api/auth/update-profile/", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      } else {
        const jsonBody = { ...profile };
        delete jsonBody.avatar;
        res = await fetch("http://127.0.0.1:8000/api/auth/update-profile/", {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify(jsonBody),
        });
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to save profile");
      }

      showToast(
        "Profile saved successfully!",
        "Your changes are updated in the database"
      );
    } catch (err: any) {
      console.error(err);
      showToast("Error saving profile", err.message || "Unknown error", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleCollapse = (section: string) =>
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  const updateField = (field: string, value: any) =>
    setProfile((prev) => ({ ...prev, [field]: value }));
  const updateArrayItem = (
    section: string,
    index: number,
    field: string,
    value: any
  ) => {
    const arr = [...(profile[section as keyof typeof profile] as any[])];
    arr[index][field] = value;
    setProfile((prev) => ({ ...prev, [section]: arr }));
  };
  const addArrayItem = (section: string, defaultObj: any) =>
    setProfile((prev) => ({
      ...prev,
      [section]: [...(prev[section as keyof typeof profile] as any[]), defaultObj],
    }));
  const removeArrayItem = (section: string, index: number) =>
    setProfile((prev) => ({
      ...prev,
      [section]: (prev[section as keyof typeof profile] as any[]).filter(
        (_, i) => i !== index
      ),
    }));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      {notification && (
        <div
          className={`fixed top-6 right-6 p-4 rounded-xl shadow-xl z-50 transition transform ${
            notification.type === "error"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          <h4 className="font-semibold text-lg">{notification.title}</h4>
          <p className="text-sm">{notification.description}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition">
        <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          {profile.avatar ? (
            <img
              src={URL.createObjectURL(profile.avatar)}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl font-bold text-gray-500">
              {profile.firstName?.[0] || "U"}
            </span>
          )}
          <label className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer border shadow hover:bg-gray-50 transition">
            <Camera className="w-5 h-5 text-gray-600" />
            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                e.target.files && updateField("avatar", e.target.files[0])
              }
            />
          </label>
        </div>
        <div className="flex-1 space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={profile.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 transition shadow-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={profile.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 transition shadow-sm"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 transition shadow-sm"
          />
          <input
            type="text"
            placeholder="Professional Headline"
            value={profile.headline}
            onChange={(e) => updateField("headline", e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 transition shadow-sm"
          />
        </div>
      </div>

      {/* About */}
      <div
        className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:shadow-2xl transition cursor-pointer"
        onClick={() => toggleCollapse("about")}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">About</h2>
          {collapsed.about ? <ChevronDown /> : <ChevronUp />}
        </div>
        {!collapsed.about && (
          <textarea
            value={profile.about}
            onChange={(e) => updateField("about", e.target.value)}
            placeholder="Write about yourself..."
            className="w-full mt-4 p-4 border rounded-xl resize-none shadow-sm focus:ring-2 focus:ring-purple-400 transition"
          />
        )}
      </div>

      {/* Experience */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleCollapse("experience")}
        >
          <h2 className="text-xl font-semibold text-gray-700">Experience</h2>
          {collapsed.experience ? <ChevronDown /> : <ChevronUp />}
        </div>
        {!collapsed.experience && (
          <div className="mt-4 space-y-4">
            {profile.experience.map((exp, idx) => (
              <div
                key={idx}
                className="border p-4 rounded-xl relative hover:shadow-md transition bg-white"
              >
                <button
                  onClick={() => removeArrayItem("experience", idx)}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    updateArrayItem("experience", idx, "company", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2 focus:ring-1 focus:ring-blue-300 transition"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) =>
                    updateArrayItem("experience", idx, "role", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2 focus:ring-1 focus:ring-blue-300 transition"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) =>
                    updateArrayItem("experience", idx, "location", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2 focus:ring-1 focus:ring-blue-300 transition"
                />
              </div>
            ))}
            <button
              onClick={() =>
                addArrayItem("experience", { company: "", role: "", location: "" })
              }
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:scale-105 transform transition"
            >
              <Plus /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveProfile}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl shadow hover:scale-105 transform transition disabled:opacity-50"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save />
          )}
          {isSaving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
