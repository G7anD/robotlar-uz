export interface AwesomeRobot {
  id: string;
  name: string;
  manufacturer: string | null;
  formats: string[];
  license: string | null;
  github_url: string;
  category: string;
  categoryUz: string;
  galleryImage: string | null;
}

const GALLERY_BASE = "https://raw.githubusercontent.com/robot-descriptions/awesome-robot-descriptions/main/gallery";

const categoryUzMap: Record<string, string> = {
  "Arms": "Manipulyatorlar",
  "Bipeds": "Ikki Oyoqlilar",
  "Dual Arms": "Qo'sh Qo'llilar",
  "Drones": "Dronlar",
  "Educational": "Ta'limiy",
  "End Effectors": "Ish Organlari",
  "Humanoids": "Humanoidlar",
  "Mobile Manipulators": "Mobil Manipulyatorlar",
  "Quadrupeds": "To'rt Oyoqlilar",
  "Wheeled": "G'ildiraklilar",
};

export const categoryOrder = [
  "Humanoids", "Quadrupeds", "Arms", "Bipeds", "Mobile Manipulators",
  "Wheeled", "Drones", "Dual Arms", "End Effectors", "Educational",
];

export function galleryUrl(filename: string): string {
  return `${GALLERY_BASE}/${filename}`;
}

export const awesomeRobots: AwesomeRobot[] = [
  // Arms
  { id: "edo", name: "e.DO", manufacturer: "Comau", formats: ["URDF"], license: "BSD-3-Clause", github_url: "https://github.com/ianathompson/eDO_description", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: galleryUrl("edo.png") },
  { id: "fr3", name: "FR3", manufacturer: "Franka Robotics", formats: ["MJCF"], license: "Apache-2.0", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/franka_fr3", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "gen2", name: "Gen2", manufacturer: "Kinova", formats: ["URDF"], license: "BSD-3-Clause", github_url: "https://github.com/Gepetto/example-robot-data/tree/master/robots/kinova_description", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: galleryUrl("gen2.png") },
  { id: "gen3", name: "Gen3", manufacturer: "Kinova", formats: ["MJCF", "URDF", "Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/Kinovarobotics/ros2_kortex/blob/main/kortex_description/robots/gen3.xacro", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "iiwa14", name: "iiwa 14", manufacturer: "KUKA", formats: ["URDF", "MJCF"], license: "BSD-3-Clause", github_url: "https://github.com/RobotLocomotion/models/tree/master/iiwa_description/urdf", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: galleryUrl("iiwa.png") },
  { id: "iiwa7", name: "iiwa 7", manufacturer: "KUKA", formats: ["URDF"], license: "MIT", github_url: "https://github.com/facebookresearch/differentiable-robot-model/blob/main/diff_robot_data/kuka_iiwa/urdf", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "panda", name: "Panda", manufacturer: "Franka Robotics", formats: ["MJCF", "URDF", "Xacro"], license: "Apache-2.0", github_url: "https://github.com/Gepetto/example-robot-data/tree/master/robots/panda_description", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: galleryUrl("panda.png") },
  { id: "ur5", name: "UR5", manufacturer: "Universal Robots", formats: ["URDF", "Xacro"], license: "Apache-2.0", github_url: "https://github.com/Gepetto/example-robot-data/blob/master/robots/ur_description/urdf/ur5_robot.urdf", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: galleryUrl("ur5.png") },
  { id: "ur5e", name: "UR5e", manufacturer: "Universal Robots", formats: ["MJCF", "Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/deepmind/mujoco_menagerie/tree/main/universal_robots_ur5e", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "ur10", name: "UR10", manufacturer: "Universal Robots", formats: ["URDF", "Xacro"], license: "Apache-2.0", github_url: "https://github.com/Gepetto/example-robot-data/blob/master/robots/ur_description/urdf/ur10_robot.urdf", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "ur10e", name: "UR10e", manufacturer: "Universal Robots", formats: ["MJCF", "Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/deepmind/mujoco_menagerie/tree/main/universal_robots_ur10e", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "ur3", name: "UR3", manufacturer: "Universal Robots", formats: ["URDF", "Xacro"], license: "Apache-2.0", github_url: "https://github.com/Gepetto/example-robot-data/blob/master/robots/ur_description/urdf/ur3_robot.urdf", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "sawyer", name: "Sawyer", manufacturer: "Rethink Robotics", formats: ["Xacro", "MJCF"], license: "Apache-2.0", github_url: "https://github.com/RethinkRobotics/sawyer_robot/tree/master/sawyer_description", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "poppy-ergo-jr", name: "Poppy Ergo Jr", manufacturer: "Poppy Project", formats: ["URDF"], license: "GPL-3.0", github_url: "https://github.com/poppy-project/poppy_ergo_jr_description", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: galleryUrl("poppy_ergo_jr.png") },
  { id: "so-arm100", name: "SO-ARM 100", manufacturer: "The Robot Studio", formats: ["MJCF", "URDF"], license: "Apache-2.0", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/trs_so_arm100", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "med14", name: "Med 14", manufacturer: "KUKA", formats: ["Xacro"], license: "Apache-2.0", github_url: "https://github.com/lbr-stack/lbr_fri_ros2_stack/tree/rolling/lbr_description/urdf/med14", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: galleryUrl("med14.png") },
  { id: "med7", name: "Med 7", manufacturer: "KUKA", formats: ["Xacro"], license: "Apache-2.0", github_url: "https://github.com/lbr-stack/lbr_fri_ros2_stack/tree/rolling/lbr_description/urdf/med7", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: galleryUrl("med7.png") },
  { id: "piper", name: "PiPER", manufacturer: "AgileX", formats: ["MJCF", "URDF"], license: "MIT", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/agilex_piper", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "rizon4", name: "Rizon4", manufacturer: "Flexiv Robotics", formats: ["MJCF", "Xacro"], license: "Apache-2.0", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/flexiv_rizon4", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "viper-x300", name: "ViperX 300", manufacturer: "Trossen Robotics", formats: ["Xacro", "MJCF"], license: "BSD-3-Clause", github_url: "https://github.com/Interbotix/interbotix_ros_manipulators", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },
  { id: "z1", name: "Z1", manufacturer: "UNITREE Robotics", formats: ["URDF"], license: "BSD-3-Clause", github_url: "https://github.com/unitreerobotics/unitree_ros/blob/master/robots/z1_description/xacro/z1.urdf", category: "Arms", categoryUz: categoryUzMap["Arms"], galleryImage: null },

  // Bipeds
  { id: "bolt", name: "Bolt", manufacturer: "ODRI", formats: ["URDF"], license: "BSD-3-Clause", github_url: "https://github.com/Gepetto/example-robot-data/tree/master/robots/bolt_description", category: "Bipeds", categoryUz: categoryUzMap["Bipeds"], galleryImage: galleryUrl("bolt.png") },
  { id: "cassie", name: "Cassie", manufacturer: "Agility Robotics", formats: ["URDF", "MJCF"], license: "MIT", github_url: "https://github.com/robot-descriptions/cassie_description", category: "Bipeds", categoryUz: categoryUzMap["Bipeds"], galleryImage: galleryUrl("cassie.png") },
  { id: "cookie", name: "Cookie", manufacturer: "Michael Mathieu", formats: ["URDF"], license: "Apache-2.0", github_url: "https://codeberg.org/upkie/cookie_description", category: "Bipeds", categoryUz: categoryUzMap["Bipeds"], galleryImage: galleryUrl("cookie.png") },
  { id: "op3", name: "OP3", manufacturer: "Robotis", formats: ["MJCF"], license: "Apache-2.0", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/robotis_op3", category: "Bipeds", categoryUz: categoryUzMap["Bipeds"], galleryImage: null },
  { id: "rhea", name: "Rhea", manufacturer: "Gabrael Levine", formats: ["URDF"], license: "MIT", github_url: "https://github.com/G-Levine/rhea_description", category: "Bipeds", categoryUz: categoryUzMap["Bipeds"], galleryImage: galleryUrl("rhea.png") },
  { id: "spryped", name: "Spryped", manufacturer: "Benjamin Bokser", formats: ["URDF"], license: "GPL-3.0", github_url: "https://github.com/bbokser/spryped/tree/master/spryped_urdf_rev06", category: "Bipeds", categoryUz: categoryUzMap["Bipeds"], galleryImage: galleryUrl("spryped.png") },
  { id: "upkie", name: "Upkie", manufacturer: "Stéphane Caron", formats: ["URDF"], license: "Apache-2.0", github_url: "https://github.com/upkie/upkie_description", category: "Bipeds", categoryUz: categoryUzMap["Bipeds"], galleryImage: galleryUrl("upkie.png") },
  { id: "bd-x", name: "BD-X", manufacturer: "Disney", formats: ["URDF", "MJCF"], license: "NVIDIA License", github_url: "https://github.com/rimim/AWD/blob/main/awd/data/assets/go_bdx/go_bdx.urdf", category: "Bipeds", categoryUz: categoryUzMap["Bipeds"], galleryImage: null },

  // Dual Arms
  { id: "baxter", name: "Baxter", manufacturer: "Rethink Robotics", formats: ["URDF", "Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/RethinkRobotics/baxter_common/blob/master/baxter_description/urdf/baxter.urdf", category: "Dual Arms", categoryUz: categoryUzMap["Dual Arms"], galleryImage: galleryUrl("baxter.png") },
  { id: "nextage", name: "NEXTAGE", manufacturer: "Kawada Robotics", formats: ["URDF"], license: "BSD", github_url: "https://github.com/tork-a/rtmros_nextage/tree/indigo-devel/nextage_description", category: "Dual Arms", categoryUz: categoryUzMap["Dual Arms"], galleryImage: galleryUrl("nextage.png") },
  { id: "poppy-torso", name: "Poppy Torso", manufacturer: "Pollen Robotics", formats: ["URDF"], license: "GPL-3.0", github_url: "https://github.com/poppy-project/poppy_torso_description", category: "Dual Arms", categoryUz: categoryUzMap["Dual Arms"], galleryImage: galleryUrl("poppy_torso.png") },
  { id: "yumi", name: "YuMi", manufacturer: "ABB", formats: ["URDF"], license: "BSD-2-Clause", github_url: "https://github.com/OrebroUniversity/yumi/tree/master/yumi_description", category: "Dual Arms", categoryUz: categoryUzMap["Dual Arms"], galleryImage: galleryUrl("yumi.png") },

  // Drones
  { id: "crazyflie-2", name: "Crazyflie 2.0", manufacturer: "Bitcraze", formats: ["URDF", "MJCF"], license: "MIT", github_url: "https://github.com/utiasDSL/gym-pybullet-drones/tree/master/gym_pybullet_drones/assets", category: "Drones", categoryUz: categoryUzMap["Drones"], galleryImage: galleryUrl("cf2.png") },
  { id: "skydio-x2", name: "X2", manufacturer: "Skydio", formats: ["MJCF", "URDF"], license: "Apache-2.0", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/skydio_x2", category: "Drones", categoryUz: categoryUzMap["Drones"], galleryImage: null },
  { id: "ingenuity", name: "Ingenuity", manufacturer: "NASA JPL", formats: ["URDF"], license: "Apache-2.0", github_url: "https://github.com/david-dorf/perseverance-ingenuity-urdfs/tree/main/ingenuity", category: "Drones", categoryUz: categoryUzMap["Drones"], galleryImage: null },

  // Educational
  { id: "double-pendulum", name: "Double Pendulum", manufacturer: null, formats: ["URDF"], license: "BSD-3-Clause", github_url: "https://github.com/Gepetto/example-robot-data/tree/master/robots/double_pendulum_description", category: "Educational", categoryUz: categoryUzMap["Educational"], galleryImage: null },
  { id: "finger-edu", name: "FingerEdu", manufacturer: null, formats: ["URDF"], license: "BSD-3-Clause", github_url: "https://github.com/Gepetto/example-robot-data/tree/master/robots/finger_edu_description", category: "Educational", categoryUz: categoryUzMap["Educational"], galleryImage: galleryUrl("finger_edu.png") },
  { id: "mujoco-humanoid", name: "MuJoCo Humanoid", manufacturer: null, formats: ["MJCF"], license: "Apache-2.0", github_url: "https://github.com/google-deepmind/mujoco/tree/main/model/humanoid", category: "Educational", categoryUz: categoryUzMap["Educational"], galleryImage: null },

  // End Effectors
  { id: "allegro-hand", name: "Allegro Hand", manufacturer: "Wonik Robotics", formats: ["URDF", "MJCF"], license: "BSD", github_url: "https://github.com/RobotLocomotion/models/tree/master/allegro_hand_description/urdf", category: "End Effectors", categoryUz: categoryUzMap["End Effectors"], galleryImage: galleryUrl("allegro_hand.png") },
  { id: "barrett-hand", name: "BarrettHand", manufacturer: "Barrett Technology", formats: ["URDF"], license: "BSD", github_url: "https://github.com/jhu-lcsr-attic/bhand_model/tree/master/robots", category: "End Effectors", categoryUz: categoryUzMap["End Effectors"], galleryImage: galleryUrl("barrett_hand.png") },
  { id: "robotiq-2f85", name: "Robotiq 2F-85", manufacturer: "Robotiq", formats: ["MJCF", "URDF", "Xacro"], license: "BSD-2-Clause", github_url: "https://github.com/deepmind/mujoco_menagerie/tree/main/robotiq_2f85", category: "End Effectors", categoryUz: categoryUzMap["End Effectors"], galleryImage: galleryUrl("robotiq_2f85.png") },
  { id: "shadow-hand", name: "Shadow Hand E3M5", manufacturer: "The Shadow Robot Company", formats: ["MJCF"], license: "Apache-2.0", github_url: "https://github.com/deepmind/mujoco_menagerie/tree/main/shadow_hand", category: "End Effectors", categoryUz: categoryUzMap["End Effectors"], galleryImage: null },
  { id: "ability-hand", name: "Ability Hand", manufacturer: "PSYONIC, Inc.", formats: ["MJCF", "URDF"], license: "MIT", github_url: "https://github.com/psyonicinc/ability-hand-api/tree/master/python/ah_simulators/mujoco_xml", category: "End Effectors", categoryUz: categoryUzMap["End Effectors"], galleryImage: null },
  { id: "leap-hand", name: "LEAP Hand v1", manufacturer: "Carnegie Mellon University", formats: ["URDF"], license: "MIT", github_url: "https://github.com/leap-hand/LEAP_Hand_Sim", category: "End Effectors", categoryUz: categoryUzMap["End Effectors"], galleryImage: null },

  // Humanoids
  { id: "atlas-drc", name: "Atlas DRC (v3)", manufacturer: "Boston Dynamics", formats: ["URDF"], license: "BSD-3-Clause", github_url: "https://github.com/RobotLocomotion/models/blob/master/atlas/atlas_convex_hull.urdf", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("atlas_drc.png") },
  { id: "atlas-v4", name: "Atlas v4", manufacturer: "Boston Dynamics", formats: ["URDF"], license: "MIT", github_url: "https://github.com/openai/roboschool/tree/1.0.49/roboschool/models_robot/atlas_description", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("atlas_v4.png") },
  { id: "berkeley-humanoid", name: "Berkeley Humanoid", manufacturer: "Hybrid Robotics", formats: ["URDF"], license: "BSD-3-Clause", github_url: "https://github.com/HybridRobotics/berkeley_humanoid_description", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("berkeley_humanoid.png") },
  { id: "draco3", name: "Draco3", manufacturer: "Apptronik", formats: ["URDF"], license: "BSD-2-Clause", github_url: "https://github.com/shbang91/draco3_description", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("draco3.png") },
  { id: "elf2", name: "Elf2", manufacturer: "BXI Robotics", formats: ["MJCF", "URDF"], license: "Apache-2.0", github_url: "https://github.com/bxirobotics/robot_models/tree/main/elf2_dof25/xml", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("elf2.png") },
  { id: "g1", name: "G1", manufacturer: "UNITREE Robotics", formats: ["MJCF", "URDF"], license: "BSD-3-Clause", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/unitree_g1", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: null },
  { id: "gr1", name: "GR-1", manufacturer: "Fourier", formats: ["URDF"], license: "GPL-3.0", github_url: "https://github.com/FFTAI/Wiki-GRx-Models/tree/master/GRX/GR1", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: null },
  { id: "h1", name: "H1", manufacturer: "UNITREE Robotics", formats: ["MJCF", "URDF"], license: "BSD-3-Clause", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/unitree_h1", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: null },
  { id: "icub", name: "iCub", manufacturer: "IIT", formats: ["URDF"], license: "CC-BY-SA-4.0", github_url: "https://github.com/robotology/icub-models/tree/master/iCub", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("icub.png") },
  { id: "jaxon", name: "JAXON", manufacturer: "JSK", formats: ["COLLADA", "URDF", "VRML"], license: "CC-BY-SA-4.0", github_url: "https://github.com/stephane-caron/openrave_models/tree/master/JAXON", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("jaxon.png") },
  { id: "jvrc1", name: "JVRC-1", manufacturer: "AIST", formats: ["MJCF", "URDF"], license: "BSD-2-Clause", github_url: "https://github.com/isri-aist/jvrc_mj_description/", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("jvrc1.png") },
  { id: "nao", name: "NAO", manufacturer: "SoftBank Robotics", formats: ["URDF", "Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/ros-naoqi/nao_robot/tree/master/nao_description/urdf/naoV50_generated_urdf", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: null },
  { id: "robonaut2", name: "Robonaut 2", manufacturer: "NASA JSC Robotics", formats: ["URDF"], license: "NASA-1.3", github_url: "https://github.com/gkjohnson/nasa-urdf-robots/tree/master/r2_description", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("r2.png") },
  { id: "romeo", name: "Romeo", manufacturer: "Aldebaran Robotics", formats: ["URDF"], license: "BSD-3-Clause", github_url: "https://github.com/ros-aldebaran/romeo_robot/tree/master/romeo_description", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("romeo.png") },
  { id: "sigmaban", name: "SigmaBan", manufacturer: "Rhoban", formats: ["URDF"], license: "MIT", github_url: "https://github.com/Rhoban/sigmaban_urdf", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("sigmaban.png") },
  { id: "talos", name: "TALOS", manufacturer: "PAL Robotics", formats: ["URDF", "Xacro", "MJCF"], license: "LGPL-3.0", github_url: "https://github.com/stack-of-tasks/talos-data", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: null },
  { id: "toddlerbot", name: "ToddlerBot 2XC", manufacturer: "Stanford University", formats: ["MJCF", "URDF"], license: "MIT", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/toddlerbot_2xc", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("toddlerbot.png") },
  { id: "valkyrie", name: "Valkyrie", manufacturer: "NASA JSC Robotics", formats: ["URDF", "Xacro"], license: "NASA-1.3", github_url: "https://github.com/gkjohnson/nasa-urdf-robots/tree/master/val_description/model", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: galleryUrl("valkyrie.png") },
  { id: "apollo", name: "Apollo", manufacturer: "Apptronik", formats: ["MJCF"], license: "Apache-2.0", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/apptronik_apollo", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: null },
  { id: "adam-lite", name: "Adam Lite", manufacturer: "PNDbotics", formats: ["MJCF"], license: "MIT", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/pndbotics_adam_lite", category: "Humanoids", categoryUz: categoryUzMap["Humanoids"], galleryImage: null },

  // Mobile Manipulators
  { id: "eve-r3", name: "Eve R3", manufacturer: "Halodi", formats: ["URDF"], license: "Apache-2.0", github_url: "https://github.com/Halodi/halodi-robot-models", category: "Mobile Manipulators", categoryUz: categoryUzMap["Mobile Manipulators"], galleryImage: galleryUrl("eve_r3.png") },
  { id: "fetch", name: "Fetch", manufacturer: "Fetch Robotics", formats: ["URDF"], license: "MIT", github_url: "https://github.com/openai/roboschool/tree/master/roboschool/models_robot/fetch_description", category: "Mobile Manipulators", categoryUz: categoryUzMap["Mobile Manipulators"], galleryImage: galleryUrl("fetch.png") },
  { id: "google-robot", name: "Google Robot", manufacturer: "Google", formats: ["MJCF"], license: "Apache-2.0", github_url: "https://github.com/google-deepmind/mujoco_menagerie/blob/main/google_robot/", category: "Mobile Manipulators", categoryUz: categoryUzMap["Mobile Manipulators"], galleryImage: null },
  { id: "pepper", name: "Pepper", manufacturer: "SoftBank Robotics", formats: ["URDF"], license: "BSD-2-Clause", github_url: "https://github.com/jrl-umi3218/pepper_description", category: "Mobile Manipulators", categoryUz: categoryUzMap["Mobile Manipulators"], galleryImage: galleryUrl("pepper.png") },
  { id: "pr2", name: "PR2", manufacturer: "Willow Garage", formats: ["URDF", "Xacro"], license: "BSD", github_url: "https://github.com/ankurhanda/robot-assets/tree/master/urdfs/robots/pr2", category: "Mobile Manipulators", categoryUz: categoryUzMap["Mobile Manipulators"], galleryImage: null },
  { id: "reachy", name: "Reachy", manufacturer: "Pollen Robotics", formats: ["URDF"], license: "Apache-2.0", github_url: "https://github.com/aubrune/reachy_description", category: "Mobile Manipulators", categoryUz: categoryUzMap["Mobile Manipulators"], galleryImage: galleryUrl("reachy.png") },
  { id: "stretch2", name: "Stretch 2", manufacturer: "Hello Robot", formats: ["MJCF"], license: "Clear BSD", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/hello_robot_stretch", category: "Mobile Manipulators", categoryUz: categoryUzMap["Mobile Manipulators"], galleryImage: null },
  { id: "tiago", name: "TIAGo", manufacturer: "PAL Robotics", formats: ["URDF", "MJCF", "Xacro"], license: "Apache-2.0", github_url: "https://github.com/Gepetto/example-robot-data/tree/master/robots/tiago_description", category: "Mobile Manipulators", categoryUz: categoryUzMap["Mobile Manipulators"], galleryImage: null },
  { id: "perseverance", name: "Perseverance", manufacturer: "NASA JPL", formats: ["URDF"], license: "Apache-2.0", github_url: "https://github.com/david-dorf/perseverance-ingenuity-urdfs/tree/main/perseverance", category: "Mobile Manipulators", categoryUz: categoryUzMap["Mobile Manipulators"], galleryImage: null },
  { id: "bambot", name: "BamBot", manufacturer: "Tim Qian", formats: ["URDF"], license: "Apache-2.0", github_url: "https://github.com/timqian/bambot", category: "Mobile Manipulators", categoryUz: categoryUzMap["Mobile Manipulators"], galleryImage: null },

  // Quadrupeds
  { id: "a1", name: "A1", manufacturer: "UNITREE Robotics", formats: ["MJCF", "URDF"], license: "MPL-2.0", github_url: "https://github.com/unitreerobotics/unitree_mujoco/tree/main/data/a1/xml", category: "Quadrupeds", categoryUz: categoryUzMap["Quadrupeds"], galleryImage: galleryUrl("a1.png") },
  { id: "anymal-b", name: "ANYmal B", manufacturer: "ANYbotics", formats: ["MJCF", "URDF"], license: "BSD-3-Clause", github_url: "https://github.com/deepmind/mujoco_menagerie/tree/main/anybotics_anymal_b", category: "Quadrupeds", categoryUz: categoryUzMap["Quadrupeds"], galleryImage: galleryUrl("anymal_b.png") },
  { id: "anymal-c", name: "ANYmal C", manufacturer: "ANYbotics", formats: ["MJCF", "URDF"], license: "BSD-3-Clause", github_url: "https://github.com/deepmind/mujoco_menagerie/tree/main/anybotics_anymal_c", category: "Quadrupeds", categoryUz: categoryUzMap["Quadrupeds"], galleryImage: galleryUrl("anymal_c.png") },
  { id: "go1", name: "Go1", manufacturer: "UNITREE Robotics", formats: ["MJCF", "URDF"], license: "BSD-3-Clause", github_url: "https://github.com/unitreerobotics/unitree_mujoco/tree/main/data/go1/xml", category: "Quadrupeds", categoryUz: categoryUzMap["Quadrupeds"], galleryImage: null },
  { id: "go2", name: "Go2", manufacturer: "UNITREE Robotics", formats: ["MJCF", "URDF"], license: "BSD-3-Clause", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/unitree_go2", category: "Quadrupeds", categoryUz: categoryUzMap["Quadrupeds"], galleryImage: null },
  { id: "mini-cheetah", name: "Mini Cheetah", manufacturer: "MIT", formats: ["URDF"], license: "BSD", github_url: "https://github.com/Derek-TH-Wang/mini_cheetah_urdf", category: "Quadrupeds", categoryUz: categoryUzMap["Quadrupeds"], galleryImage: galleryUrl("mini_cheetah.png") },
  { id: "spot", name: "Spot", manufacturer: "Boston Dynamics", formats: ["MJCF", "Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/boston_dynamics_spot", category: "Quadrupeds", categoryUz: categoryUzMap["Quadrupeds"], galleryImage: null },
  { id: "solo", name: "Solo", manufacturer: "ODRI", formats: ["URDF"], license: "BSD-3-Clause", github_url: "https://github.com/Gepetto/example-robot-data/tree/master/robots/solo_description", category: "Quadrupeds", categoryUz: categoryUzMap["Quadrupeds"], galleryImage: galleryUrl("solo.png") },
  { id: "pupper-v3", name: "Pupper v3", manufacturer: "Gabrael Levine", formats: ["URDF"], license: "MIT", github_url: "https://github.com/G-Levine/pupper_v3_description", category: "Quadrupeds", categoryUz: categoryUzMap["Quadrupeds"], galleryImage: null },
  { id: "barkour-v0", name: "Barkour v0", manufacturer: "Google", formats: ["MJCF", "URDF"], license: "Apache-2.0", github_url: "https://github.com/google-deepmind/mujoco_menagerie/blob/main/google_barkour_v0/barkour_v0.xml", category: "Quadrupeds", categoryUz: categoryUzMap["Quadrupeds"], galleryImage: null },
  { id: "hyq", name: "HyQ", manufacturer: "IIT", formats: ["URDF"], license: "Apache-2.0", github_url: "https://github.com/Gepetto/example-robot-data/tree/master/robots/hyq_description", category: "Quadrupeds", categoryUz: categoryUzMap["Quadrupeds"], galleryImage: null },

  // Wheeled
  { id: "husky", name: "Husky", manufacturer: "Clearpath Robotics", formats: ["Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/husky/husky/tree/noetic-devel/husky_description", category: "Wheeled", categoryUz: categoryUzMap["Wheeled"], galleryImage: null },
  { id: "jackal", name: "Jackal", manufacturer: "Clearpath Robotics", formats: ["Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/jackal/jackal/tree/noetic-devel/jackal_description", category: "Wheeled", categoryUz: categoryUzMap["Wheeled"], galleryImage: null },
  { id: "rsk", name: "RSK omnidirectional", manufacturer: "Robot Soccer Kit", formats: ["MJCF", "URDF"], license: "MIT", github_url: "https://github.com/google-deepmind/mujoco_menagerie/tree/main/robot_soccer_kit", category: "Wheeled", categoryUz: categoryUzMap["Wheeled"], galleryImage: galleryUrl("rsk.png") },
  { id: "rb-kairos", name: "RB-KAIROS", manufacturer: "Robotnik Automation", formats: ["Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/RobotnikAutomation/robotnik_description", category: "Wheeled", categoryUz: categoryUzMap["Wheeled"], galleryImage: galleryUrl("rb-kairos.png") },
  { id: "rb-kairos-plus", name: "RB-KAIROS+", manufacturer: "Robotnik Automation", formats: ["Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/RobotnikAutomation/robotnik_description", category: "Wheeled", categoryUz: categoryUzMap["Wheeled"], galleryImage: galleryUrl("rb-kairos-plus.png") },
  { id: "rb-robout", name: "RB-ROBOUT", manufacturer: "Robotnik Automation", formats: ["Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/RobotnikAutomation/robotnik_description", category: "Wheeled", categoryUz: categoryUzMap["Wheeled"], galleryImage: galleryUrl("rb-robout.png") },
  { id: "rb-vogui", name: "RB-VOGUI", manufacturer: "Robotnik Automation", formats: ["Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/RobotnikAutomation/robotnik_description", category: "Wheeled", categoryUz: categoryUzMap["Wheeled"], galleryImage: galleryUrl("rb-vogui.png") },
  { id: "ridgeback", name: "Ridgeback", manufacturer: "Clearpath Robotics", formats: ["Xacro"], license: "BSD-3-Clause", github_url: "https://github.com/ridgeback/ridgeback/tree/melodic-devel/ridgeback_description", category: "Wheeled", categoryUz: categoryUzMap["Wheeled"], galleryImage: null },
];

export const categories = categoryOrder.map((cat) => ({
  name: cat,
  nameUz: categoryUzMap[cat],
  count: awesomeRobots.filter((r) => r.category === cat).length,
}));
