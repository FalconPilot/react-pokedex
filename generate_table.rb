begin

  def genTable(imgDir, exportDir)
    File.open("#{exportDir}/images.js", "w+") do |file|
      file.puts "export default {"
      Dir["#{imgDir}/*.png"].each do |img|
        index = img.split(".png")[0].split("/")[-1]
        file.puts "  \"img_#{index}\": require(\".#{img}\"),"
      end
      file.puts "};"
    end
    puts "File #{exportDir}/images.js generated !"
  end

  genTable("./assets/pokeapi/sprites/pokemon", "./src")

end
