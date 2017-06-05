begin

  # ---------------
  # Local variables
  # ---------------
  exportdir = "./src"
  imgdir = "./assets/pokeapi/sprites/pokemon"
  extension = ".png"

  # ----------------
  # Create main file
  # ----------------
  File.open("#{exportdir}/images.js", "w+") do |file|
    file.puts "export default {"
    # ----------------------
    # Iterate through images
    # ----------------------
    Dir["#{imgdir}/*#{extension}"].each do |img|
      index = img.split(extension)[0].split("/")[-1]
      file.puts "  \"img_#{index}\": require(\".#{img}\"),"
    end
    file.puts "};"
  end

  # --------------------
  # Confirmation message
  # --------------------
  puts "File #{exportdir}/images.js generated !"

end
