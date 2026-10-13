# 🕯️ Lonely Candle – Three.js

An interactive 3D candle experience built with **HTML, CSS, JavaScript, and Three.js**. The project features a glowing candle flame, flickering light, a metallic candle holder, and an atmospheric dark environment.

## ✨ Features

- **Interactive 3D Scene:** Explore the candle from different angles using mouse controls.
- **Animated Flame:** A custom GLSL shader creates a gently moving flame with a gradient of yellow, orange, and red.
- **Realistic Lighting:** Warm point lights simulate the candle's glow, with subtle changes in brightness to create a flickering effect.
- **3D Candle Model:** A candle made from custom geometries, featuring paraffin wax, a wick, and a silver holder.
- **Textured Wooden Table:** A wood-textured surface adds depth to the scene.
- **Orbit Controls:** Rotate the view and zoom in or out to explore the candle.
- **Information Panel:** Click the information button to reveal or hide the project description.
- **Responsive Rendering:** The scene adjusts to changes in the browser window size.
- **Atmospheric Design:** A dark background and warm candlelight create a calm, minimal visual experience.

## 🛠️ Technologies Used

- **HTML5** – Page structure and interface elements.
- **CSS3** – Layout, colors, transitions, and information panel styling.
- **JavaScript (ES Modules)** – Scene setup, interaction, and animation logic.
- **Three.js** – 3D rendering, geometries, materials, lighting, and camera controls.
- **GLSL Shaders** – Custom flame deformation and color gradients.
- **OrbitControls** – Interactive camera rotation and zoom.
- **WebGL** – Hardware-accelerated 3D rendering.

## 📂 Project Structure

```text
Lonely-Candle/
├── index.html       # HTML structure and Three.js import map
├── style.css        # Page styling and information panel
├── script.js        # 3D scene, candle model, lighting, and animation
└── README.md        # Project documentation
```

## 🚀 Getting Started

### Prerequisites

You need a modern web browser with WebGL support and an internet connection to load Three.js and the external wood texture.

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project folder:

   ```bash
   cd Lonely-Candle
   ```

3. Open the project using a local development server.

   For example, if you have Visual Studio Code installed, you can use the **Live Server** extension to serve `index.html`.

4. Open the local URL provided by your development server in your browser.

**Note:** Because the project uses JavaScript ES modules and an import map, running it through a local server is recommended instead of opening `index.html` directly.

## 🎮 How to Use

| Action | Function |
|---|---|
| Drag the mouse | Rotate the camera around the candle |
| Scroll the mouse wheel | Zoom in or out |
| Click the `i` button | Open or close the information panel |
| Resize the browser | Adjust the 3D scene to the new viewport |

The camera automatically rotates around the candle to create a continuous viewing experience.

## 🔥 How It Works

### 1. 3D Scene and Camera

Three.js creates the scene, perspective camera, and WebGL renderer. The camera provides a three-dimensional view of the candle, while OrbitControls allows the user to explore it interactively.

### 2. Procedural Candle Model

The candle holder, wax, and wick are constructed using Three.js geometries and custom paths. Standard materials define their visual appearance, including the metallic finish of the holder.

### 3. Animated Flame Shader

A custom GLSL shader deforms the flame geometry over time using sine and cosine functions. The fragment shader blends warm colors to produce a glowing flame effect with transparent edges.

### 4. Flickering Candlelight

Two warm point lights illuminate the candle and its surroundings. One light subtly moves and changes intensity over time, simulating the natural variation of candlelight.

### 5. User Interface

HTML and CSS provide the information button and expandable information panel. JavaScript handles the click interaction and animates the panel's size, padding, and colors through CSS transitions.

## 🎨 Design Highlights

- Dark, minimal background to emphasize the candle.
- Warm orange and yellow tones for the flame and interface accents.
- Metallic silver candle holder with a smooth finish.
- Soft lighting and shadows for a more atmospheric 3D scene.
- Automatic camera rotation for a dynamic presentation.

## 📚 What I Learned

This project provided an opportunity to practice:

- Creating and managing a 3D scene with Three.js.
- Building custom 3D objects using geometry and paths.
- Applying materials, textures, lights, and shadows.
- Writing custom vertex and fragment shaders with GLSL.
- Animating objects and shader uniforms over time.
- Implementing interactive camera controls.
- Combining CSS transitions with JavaScript interactions.
- Organizing a small interactive graphics project using JavaScript modules.

## 🔮 Future Improvements

- Add more natural flame movement and subtle changes in flame shape.
- Improve the candle wax with melted edges and dripping wax.
- Add a glow or bloom post-processing effect.
- Improve mobile touch interactions and overall responsiveness.
- Refine the information panel's open and close transitions.

## 👩‍💻 Author

**Hadeer Altabaa**

Computing with Business Graduate | Web Developer & Data Analyst

- GitHub: [@HadeerAltabaa](https://github.com/HadeerAltabaa)

---

*Built with curiosity, creativity, and Three.js.* 🕯️